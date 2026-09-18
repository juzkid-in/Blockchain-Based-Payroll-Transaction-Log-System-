"""
Automated End-to-End Verification Test Script
VTU BIC702 Activity Based Learning - Activity 1
Student: Sanjai Shanmuga Prabu (1SP23IC047)
Project: Blockchain-Based Payroll Transaction Log System

Tests the complete 8-step academic demonstration workflow:
1. Start the application (Flask client initialization).
2. Create the Genesis Block (Block #0).
3. Add 3 payroll transactions (Rahul Kumar, Priya Sharma, Arjun Rao).
4. Display all blocks (inspect hashes, links, indexes).
5. Verify the blockchain (confirm 100% cryptographic validity).
6. Run the tamper detection demonstration (tamper salary of Block #1, detect mismatch).
7. Restore the data (recover authentic salary).
8. Verify the blockchain again (confirm integrity restored).
"""

import sys
import os
import unittest

# Ensure blockchain-payroll directory is on sys.path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from blockchain import PayrollBlockchain, Block
from app import app, payroll_chain, original_blocks_backup


class TestPayrollBlockchainEndToEnd(unittest.TestCase):
    def setUp(self):
        # Configure test client
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        self.client = app.test_client()

    def test_complete_8_step_workflow(self):
        print("\n" + "="*80)
        print("  STARTING END-TO-END WORKFLOW VERIFICATION (VTU BIC702)")
        print("  Student: Sanjai Shanmuga Prabu | USN: 1SP23IC047")
        print("="*80)

        # -------------------------------------------------------------
        # STEP 1: Start the application
        # -------------------------------------------------------------
        print("\n[STEP 1] Starting application & checking base routes...")
        res = self.client.get('/')
        self.assertEqual(res.status_code, 200, "Home page must respond with HTTP 200")
        self.assertIn(b"Payroll Transaction Log System", res.data)
        self.assertIn(b"Sanjai Shanmuga Prabu", res.data)
        self.assertIn(b"1SP23IC047", res.data)
        print("  [SUCCESS] Application started and home dashboard is responsive (HTTP 200).")

        # -------------------------------------------------------------
        # STEP 2: Create the Genesis Block
        # -------------------------------------------------------------
        print("\n[STEP 2] Creating and verifying the Genesis Block (Block #0)...")
        # Reset chain to Genesis only
        res_reset = self.client.get('/reset', follow_redirects=True)
        self.assertEqual(res_reset.status_code, 200)
        
        self.assertEqual(len(payroll_chain.chain), 1, "Chain should contain exactly 1 Genesis Block")
        genesis = payroll_chain.chain[0]
        self.assertEqual(genesis.index, 0, "Genesis Block index must be 0")
        self.assertEqual(genesis.previous_hash, "0", "Genesis Block previous_hash must be '0'")
        self.assertEqual(len(genesis.hash), 64, "SHA-256 hash must be 64 hex characters")
        
        # Verify Genesis block hash matches recalculated
        recalculated_genesis = genesis.calculate_hash()
        self.assertEqual(genesis.hash, recalculated_genesis, "Genesis hash must match calculated hash")
        print(f"  [SUCCESS] Genesis Block created successfully:")
        print(f"    - Index: {genesis.index}")
        print(f"    - Prev Hash: {genesis.previous_hash}")
        print(f"    - SHA-256 Hash: {genesis.hash}")
        print(f"    - Initialized By: {genesis.data.get('initialized_by')}")

        # -------------------------------------------------------------
        # STEP 3: Add 3 payroll transactions
        # -------------------------------------------------------------
        print("\n[STEP 3] Adding 3 payroll transactions...")
        txns_to_add = [
            {
                "employee_id": "EMP101",
                "employee_name": "Rahul Kumar",
                "salary": "45000",
                "payroll_month": "September 2026",
                "payment_status": "Paid",
                "remarks": "Senior Developer Salary"
            },
            {
                "employee_id": "EMP102",
                "employee_name": "Priya Sharma",
                "salary": "52000",
                "payroll_month": "September 2026",
                "payment_status": "Paid",
                "remarks": "Team Lead Salary"
            },
            {
                "employee_id": "EMP103",
                "employee_name": "Arjun Rao",
                "salary": "38000",
                "payroll_month": "September 2026",
                "payment_status": "Pending",
                "remarks": "Associate Engineer Salary"
            }
        ]

        for i, txn in enumerate(txns_to_add, 1):
            res_post = self.client.post('/add-payroll', data=txn, follow_redirects=True)
            self.assertEqual(res_post.status_code, 200, f"Adding txn #{i} must succeed")
            self.assertEqual(len(payroll_chain.chain), i + 1, f"Chain length should now be {i + 1}")
            block = payroll_chain.chain[i]
            self.assertEqual(block.index, i)
            self.assertEqual(block.data['employee_id'], txn['employee_id'])
            self.assertEqual(block.data['employee_name'], txn['employee_name'])
            self.assertEqual(block.data['salary'], int(txn['salary']))
            # Check link to previous block
            self.assertEqual(block.previous_hash, payroll_chain.chain[i - 1].hash, "Block link must match previous hash")
            print(f"  [SUCCESS] Transaction #{i} added -> Block #{block.index}: {txn['employee_name']} (Rs.{txn['salary']})")
            print(f"    SHA-256: {block.hash}")
            print(f"    Linked PrevHash: {block.previous_hash}")

        self.assertEqual(len(payroll_chain.chain), 4, "Chain must now have 4 total blocks (Genesis + 3 txns)")

        # -------------------------------------------------------------
        # STEP 4: Display all blocks
        # -------------------------------------------------------------
        print("\n[STEP 4] Displaying all blocks from the ledger...")
        res_blocks = self.client.get('/blockchain')
        self.assertEqual(res_blocks.status_code, 200)
        for i in range(4):
            self.assertIn(f"Block #{i}".encode(), res_blocks.data, f"Block #{i} must appear in HTML output")
        
        self.assertIn(b"EMP101", res_blocks.data)
        self.assertIn(b"Rahul Kumar", res_blocks.data)
        self.assertIn(b"EMP102", res_blocks.data)
        self.assertIn(b"Priya Sharma", res_blocks.data)
        self.assertIn(b"EMP103", res_blocks.data)
        self.assertIn(b"Arjun Rao", res_blocks.data)
        print("  [SUCCESS] All 4 blocks displayed correctly in ledger view with full cryptographic metadata.")

        # -------------------------------------------------------------
        # STEP 5: Verify the blockchain
        # -------------------------------------------------------------
        print("\n[STEP 5] Verifying blockchain cryptographic integrity...")
        is_valid, msg, checks = payroll_chain.validate_chain()
        self.assertTrue(is_valid, "Pristine chain must pass all validation checks")
        self.assertEqual(len(checks), 4, "Must have 4 check records")
        for chk in checks:
            self.assertTrue(chk['hash_matches'], f"Block #{chk['index']} hash must match recalculated hash")
            self.assertTrue(chk['prev_link_matches'], f"Block #{chk['index']} previous link must match")
            self.assertTrue(chk['is_valid'], f"Block #{chk['index']} must be valid")

        res_verify = self.client.get('/verify')
        self.assertEqual(res_verify.status_code, 200)
        self.assertIn(b"VALID", res_verify.data)
        print(f"  [SUCCESS] Initial Verification: {msg}")

        # -------------------------------------------------------------
        # STEP 6: Run tamper detection demonstration
        # -------------------------------------------------------------
        print("\n[STEP 6] Running tamper detection demonstration...")
        original_salary_block1 = payroll_chain.chain[1].data['salary']
        fraudulent_salary = 99999
        print(f"  Simulating malicious alteration on Block #1 (Rahul Kumar):")
        print(f"    Original Salary: Rs.{original_salary_block1}")
        print(f"    Fraudulent Salary: Rs.{fraudulent_salary}")

        res_tamper = self.client.post('/tamper-demo', data={
            'block_index': 1,
            'tampered_salary': fraudulent_salary
        }, follow_redirects=True)
        self.assertEqual(res_tamper.status_code, 200)

        # Inspect blockchain after tampering
        tampered_is_valid, tampered_msg, tampered_checks = payroll_chain.validate_chain()
        self.assertFalse(tampered_is_valid, "Blockchain must be flagged INVALID after data tampering")
        self.assertFalse(tampered_checks[1]['hash_matches'], "Block #1 hash must NOT match recalculated hash")
        self.assertFalse(tampered_checks[1]['is_valid'], "Block #1 status must be marked INVALID")
        self.assertIn("INVALID", tampered_msg)
        self.assertIn("Block #1", tampered_msg)
        print(f"  [SUCCESS] Tampering Detected Immediatly!")
        print(f"    Message: {tampered_msg}")
        print(f"    Stored Hash on Block #1:         {tampered_checks[1]['stored_hash']}")
        print(f"    Recalculated SHA-256 for Block 1: {tampered_checks[1]['recalculated_hash']}")
        print("    -> Stored hash DOES NOT MATCH computed hash! Tamper proof established.")

        # -------------------------------------------------------------
        # STEP 7: Restore the data
        # -------------------------------------------------------------
        print("\n[STEP 7] Restoring authentic data...")
        res_restore = self.client.get('/restore-data', follow_redirects=True)
        self.assertEqual(res_restore.status_code, 200)
        restored_salary = payroll_chain.chain[1].data['salary']
        self.assertEqual(restored_salary, original_salary_block1, "Salary must be restored to original value")
        print(f"  [SUCCESS] Block #1 salary restored to: Rs.{restored_salary}")

        # -------------------------------------------------------------
        # STEP 8: Verify the blockchain again
        # -------------------------------------------------------------
        print("\n[STEP 8] Re-verifying blockchain integrity after restoration...")
        re_valid, re_msg, re_checks = payroll_chain.validate_chain()
        self.assertTrue(re_valid, "Blockchain must be 100% VALID after data restoration")
        for chk in re_checks:
            self.assertTrue(chk['hash_matches'], f"Block #{chk['index']} hash must match")
            self.assertTrue(chk['prev_link_matches'], f"Block #{chk['index']} link must match")
            self.assertTrue(chk['is_valid'], f"Block #{chk['index']} must be valid")

        res_final_verify = self.client.get('/verify')
        self.assertEqual(res_final_verify.status_code, 200)
        self.assertIn(b"VALID", res_final_verify.data)
        print(f"  [SUCCESS] Re-verification result: {re_msg}")
        print("\n" + "="*80)
        print("  ALL 8 WORKFLOW STEPS VERIFIED END-TO-END WITH ZERO ERRORS!")
        print("="*80 + "\n")


if __name__ == '__main__':
    unittest.main()
