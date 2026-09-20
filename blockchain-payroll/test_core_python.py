"""
Standard Library Python Verification Test
Direct verification of blockchain.py (No third-party packages required)
Student: Sanjai Shanmuga Prabu (1SP23IC047)
VTU BIC702 - Activity 1
"""
import sys
import os

# Add directory to sys.path
sys.path.insert(0, os.path.dirname(__file__))

from blockchain import PayrollBlockchain

def run_test():
    print("=" * 70)
    print("PYTHON BLOCKCHAIN CORE ENGINE VERIFICATION")
    print("Student: Sanjai Shanmuga Prabu | USN: 1SP23IC047")
    print("Department: IoT, Cybersecurity and Blockchain Technology")
    print("=" * 70)

    # 1. Initialize
    chain = PayrollBlockchain()
    assert len(chain.chain) == 1, "Genesis block should be created"
    genesis = chain.chain[0]
    print(f"[STEP 1 & 2] Genesis Block Created:")
    print(f"  Index: {genesis.index}, PrevHash: {genesis.previous_hash}, Hash: {genesis.hash[:16]}...")

    # 2. Add 3 transactions
    print("[STEP 3] Adding 3 Payroll Transactions...")
    b1 = chain.add_payroll_block("EMP001", "Rahul Kumar", 45000, "September 2026", "Paid", "Base Salary")
    print(f"  Added Block #1: Rahul Kumar (Rs.45000) -> Hash: {b1.hash[:16]}...")

    b2 = chain.add_payroll_block("EMP002", "Priya Sharma", 52000, "September 2026", "Paid", "Base Salary")
    print(f"  Added Block #2: Priya Sharma (Rs.52000) -> Hash: {b2.hash[:16]}...")

    b3 = chain.add_payroll_block("EMP003", "Arjun Rao", 38000, "September 2026", "Pending", "Awaiting Clearance")
    print(f"  Added Block #3: Arjun Rao (Rs.38000) -> Hash: {b3.hash[:16]}...")

    # 3. Verify
    print("[STEP 4 & 5] Verifying Ledger...")
    valid, msg, checks = chain.validate_chain()
    assert valid, f"Chain should be valid: {msg}"
    print(f"  [SUCCESS] {msg}")

    # 4. Tamper
    print("[STEP 6] Simulating Salary Tampering on Block #1...")
    orig_salary = chain.chain[1].data["salary"]
    chain.tamper_block(1, 99999)
    valid, msg, checks = chain.validate_chain()
    assert not valid, "Chain should detect tampering"
    print(f"  [SUCCESS] Tampering Caught! {msg}")

    # 5. Restore
    print("[STEP 7] Restoring Original Authentic Salary...")
    chain.restore_block(1, orig_salary)
    valid, msg, checks = chain.validate_chain()
    assert valid, "Chain should be valid again"
    print(f"  [SUCCESS] Post-Restoration: {msg}")

    print("=" * 70)
    print("ALL CORE PYTHON TESTS PASSED SUCCESSFULLY!")
    print("=" * 70)

if __name__ == "__main__":
    run_test()
