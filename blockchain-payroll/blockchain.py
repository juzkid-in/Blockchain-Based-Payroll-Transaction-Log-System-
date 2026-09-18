"""
Blockchain Core Engine for Payroll Transaction Log System
Subject: Blockchain Technology (BIC702) - Activity 1
Student Name: Sanjai Shanmuga Prabu
USN: 1SP23IC047
Institution: Visvesvaraya Technological University (VTU)
"""

import hashlib
import json
from datetime import datetime


class Block:
    """
    Represents an individual block in the Payroll Blockchain.
    Contains:
    1. Block Index
    2. Timestamp
    3. Payroll Transaction Data (Employee ID, Name, Salary, Month, Payment Status)
    4. Previous Hash
    5. Current Hash (SHA-256)
    """
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        """
        Calculates SHA-256 cryptographic hash based on:
        - Block index
        - Timestamp
        - Payroll data (canonical JSON sorted)
        - Previous hash
        """
        serialized_data = json.dumps(self.data, sort_keys=True)
        raw_string = f"{self.index}|{self.timestamp}|{serialized_data}|{self.previous_hash}"
        return hashlib.sha256(raw_string.encode('utf-8')).hexdigest()

    def to_dict(self):
        return {
            'index': self.index,
            'timestamp': self.timestamp,
            'data': self.data,
            'previous_hash': self.previous_hash,
            'hash': self.hash,
            'is_genesis': self.index == 0
        }


class PayrollBlockchain:
    """
    Manages the chain of payroll blocks, Genesis block creation,
    transaction appending, and cryptographic verification.
    """
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
        """
        Creates Block 0 (Genesis Block):
        - Index = 0
        - Previous Hash = '0'
        - Initialization message
        - Its own SHA-256 hash
        """
        genesis_data = {
            'message': 'Genesis Block - VTU BIC702 Payroll Chain Initialized',
            'initialized_by': 'Sanjai Shanmuga Prabu (1SP23IC047)'
        }
        genesis_block = Block(
            index=0,
            timestamp="2026-09-01T09:00:00.000Z",
            data=genesis_data,
            previous_hash="0"
        )
        self.chain = [genesis_block]
        return genesis_block

    def get_latest_block(self):
        return self.chain[-1]

    def add_payroll_block(self, employee_id, employee_name, salary, payroll_month, payment_status, remarks=""):
        """
        Appends a new verified payroll transaction block:
        1. Validates previous block
        2. Assigns index = previous.index + 1
        3. Links previous_hash = previous.hash
        4. Computes SHA-256 digest
        """
        previous_block = self.get_latest_block()
        payroll_data = {
            'employee_id': str(employee_id).strip().upper(),
            'employee_name': str(employee_name).strip(),
            'salary': int(salary),
            'payroll_month': str(payroll_month).strip(),
            'payment_status': str(payment_status).strip(),
            'remarks': str(remarks).strip()
        }

        new_block = Block(
            index=previous_block.index + 1,
            timestamp=datetime.utcnow().isoformat() + "Z",
            data=payroll_data,
            previous_hash=previous_block.hash
        )
        self.chain.append(new_block)
        return new_block

    def validate_chain(self):
        """
        Rigorous cryptographic validation function:
        For every block after Genesis:
        1. Check current hash equals recalculated hash.
        2. Check current block's previous_hash equals previous block's hash.
        """
        checks = []
        is_valid = True
        first_failure = None

        for i in range(len(self.chain)):
            current_block = self.chain[i]
            recalculated_hash = current_block.calculate_hash()
            hash_matches = current_block.hash == recalculated_hash

            prev_link_matches = True
            expected_prev_hash = "0"

            if i == 0:
                if current_block.previous_hash != "0":
                    prev_link_matches = False
            else:
                previous_block = self.chain[i - 1]
                expected_prev_hash = previous_block.hash
                prev_link_matches = (current_block.previous_hash == previous_block.hash)

            block_ok = hash_matches and prev_link_matches
            if not block_ok and is_valid:
                is_valid = False
                first_failure = i

            checks.append({
                'index': current_block.index,
                'stored_hash': current_block.hash,
                'recalculated_hash': recalculated_hash,
                'hash_matches': hash_matches,
                'stored_prev_hash': current_block.previous_hash,
                'expected_prev_hash': expected_prev_hash,
                'prev_link_matches': prev_link_matches,
                'is_valid': block_ok
            })

        message = (
            "Blockchain Status: VALID. No tampering detected."
            if is_valid
            else f"Blockchain Status: INVALID. Tampering detected at or prior to Block #{first_failure}."
        )

        return is_valid, message, checks

    def tamper_block(self, block_index, new_salary):
        """
        Academic demonstration sandbox:
        Modifies stored salary value WITHOUT updating the cryptographic hash,
        simulating an unauthorized database modification.
        """
        if 0 < block_index < len(self.chain):
            self.chain[block_index].data['salary'] = int(new_salary)
            return True
        return False

    def restore_block(self, block_index, original_salary):
        """
        Restores a tampered block's salary back to its genuine value.
        """
        if 0 < block_index < len(self.chain):
            self.chain[block_index].data['salary'] = int(original_salary)
            return True
        return False
