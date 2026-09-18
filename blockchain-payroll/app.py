"""
Flask Controller for Blockchain-Based Payroll Transaction Log System
Subject: Blockchain Technology (BIC702) - Activity 1
Student: Sanjai Shanmuga Prabu (USN: 1SP23IC047)
Visvesvaraya Technological University (VTU)
"""

from flask import Flask, render_template, request, redirect, url_for, flash
from blockchain import PayrollBlockchain

app = Flask(__name__)
app.secret_key = "vtu-bic702-secret-key-1sp23ic047"

# Global in-memory blockchain instance
payroll_chain = PayrollBlockchain()

# Original values backup for safe viva demonstration and restoration
original_blocks_backup = {}

# Student details constant for templates
STUDENT_INFO = {
    'name': 'Sanjai Shanmuga Prabu',
    'usn': '1SP23IC047',
    'subject': 'Blockchain Technology',
    'subject_code': 'BIC702',
    'activity': 'Activity Based Learning – Activity 1',
    'topic': 'Payroll Transaction Log',
    'title': 'Blockchain-Based Payroll Transaction Log System'
}

@app.context_processor
def inject_student_info():
    return dict(student_info=STUDENT_INFO)

@app.route('/')
def index():
    is_valid, status_msg, _ = payroll_chain.validate_chain()
    return render_template(
        'index.html',
        chain=payroll_chain.chain,
        total_blocks=len(payroll_chain.chain),
        payroll_txns=len(payroll_chain.chain) - 1,
        is_valid=is_valid,
        status_msg=status_msg
    )

@app.route('/add-payroll', methods=['GET', 'POST'])
def add_payroll():
    if request.method == 'POST':
        emp_id = request.form.get('employee_id', '').strip()
        emp_name = request.form.get('employee_name', '').strip()
        salary = request.form.get('salary', '').strip()
        month = request.form.get('payroll_month', '').strip()
        status = request.form.get('payment_status', 'Paid')
        remarks = request.form.get('remarks', '').strip()

        # Validation (Section 22)
        if not emp_id or not emp_name or not salary or not month:
            flash("All mandatory fields (Employee ID, Name, Salary, Month) are required!", "error")
            return redirect(url_for('add_payroll'))

        try:
            sal_num = int(salary)
            if sal_num <= 0:
                raise ValueError
        except ValueError:
            flash("Salary must be a positive integer amount.", "error")
            return redirect(url_for('add_payroll'))

        new_block = payroll_chain.add_payroll_block(
            emp_id, emp_name, sal_num, month, status, remarks
        )
        flash(f"Block #{new_block.index} successfully created and appended to chain! SHA-256: {new_block.hash[:16]}...", "success")
        return redirect(url_for('view_blockchain'))

    return render_template('add_payroll.html', latest_block=payroll_chain.get_latest_block())

@app.route('/blockchain')
def view_blockchain():
    is_valid, status_msg, _ = payroll_chain.validate_chain()
    return render_template('blockchain.html', chain=payroll_chain.chain, is_valid=is_valid)

@app.route('/verify')
def verify():
    is_valid, status_msg, checks = payroll_chain.validate_chain()
    return render_template(
        'verify.html',
        chain=payroll_chain.chain,
        is_valid=is_valid,
        status_msg=status_msg,
        checks=checks
    )

@app.route('/tamper-demo', methods=['GET', 'POST'])
def tamper_demo():
    if request.method == 'POST':
        block_idx = int(request.form.get('block_index', 1))
        new_sal = int(request.form.get('tampered_salary', 50000))
        # Backup original salary if not already stored
        if block_idx not in original_blocks_backup and 0 < block_idx < len(payroll_chain.chain):
            original_blocks_backup[block_idx] = payroll_chain.chain[block_idx].data['salary']
        payroll_chain.tamper_block(block_idx, new_sal)
        flash(f"Simulated tampering applied: Block #{block_idx} salary altered to ₹{new_sal:,}! Verification will now detect the anomaly.", "warning")
        return redirect(url_for('verify'))

    return render_template('tamper_demo.html', chain=payroll_chain.chain, backups=original_blocks_backup)

@app.route('/restore')
@app.route('/restore-data')
def restore_data():
    if original_blocks_backup:
        for b_idx, orig_sal in list(original_blocks_backup.items()):
            payroll_chain.restore_block(b_idx, orig_sal)
        original_blocks_backup.clear()
        flash("Tampered block data restored to its authentic cryptographic state! Integrity re-verified.", "success")
    else:
        # If no specific backup existed, restore clean 3 sample transactions
        payroll_chain.chain = []
        payroll_chain.create_genesis_block()
        payroll_chain.add_payroll_block("EMP001", "Rahul Kumar", 35000, "September 2026", "Paid", "Demonstration Data")
        payroll_chain.add_payroll_block("EMP002", "Priya Sharma", 42000, "September 2026", "Paid", "Demonstration Data")
        payroll_chain.add_payroll_block("EMP003", "Arjun Rao", 38000, "September 2026", "Pending", "Demonstration Data")
        flash("Blockchain restored with 3 pristine verified payroll records.", "success")
    return redirect(url_for('verify'))

@app.route('/architecture')
def architecture():
    return render_template('architecture.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/load-sample-data')
def load_sample_data():
    # Reset and seed 3 records
    payroll_chain.chain = []
    payroll_chain.create_genesis_block()
    payroll_chain.add_payroll_block("EMP001", "Rahul Kumar", 35000, "September 2026", "Paid", "Demonstration Data")
    payroll_chain.add_payroll_block("EMP002", "Priya Sharma", 42000, "September 2026", "Paid", "Demonstration Data")
    payroll_chain.add_payroll_block("EMP003", "Arjun Rao", 38000, "September 2026", "Pending", "Demonstration Data")
    flash("Loaded 3 demonstration payroll transactions (Rahul Kumar ₹35,000, Priya Sharma ₹42,000, Arjun Rao ₹38,000).", "info")
    return redirect(url_for('index'))

@app.route('/reset')
def reset():
    payroll_chain.chain = []
    payroll_chain.create_genesis_block()
    flash("Blockchain reset to Genesis Block (Block #0) only.", "info")
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
