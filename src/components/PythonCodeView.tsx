import React, { useState } from 'react';
import { Code2, Copy, Check, Terminal, FileCode2, Download } from 'lucide-react';

export const PythonCodeView: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'blockchain.py' | 'app.py' | 'requirements.txt'>('blockchain.py');
  const [copied, setCopied] = useState(false);

  const blockchainPyContent = `"""
Blockchain-Based Payroll Transaction Log System
Subject: Blockchain Technology (BIC702) - Activity 1
Student: Sanjai Shanmuga Prabu (USN: 1SP23IC047)
Institution: Visvesvaraya Technological University (VTU)
"""

import hashlib
import json
import time
from datetime import datetime

class Block:
    def __init__(self, index, timestamp, data, previous_hash):
        self.index = index
        self.timestamp = timestamp
        self.data = data
        self.previous_hash = previous_hash
        self.hash = self.calculate_hash()

    def calculate_hash(self):
        # Deterministic sorting of payload dictionary for canonical hashing
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
    def __init__(self):
        self.chain = []
        self.create_genesis_block()

    def create_genesis_block(self):
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
        self.chain.append(genesis_block)
        return genesis_block

    def get_latest_block(self):
        return self.chain[-1]

    def add_payroll_block(self, employee_id, employee_name, salary, payroll_month, payment_status, remarks=""):
        previous_block = self.get_latest_block()
        payroll_data = {
            'employee_id': employee_id.strip().upper(),
            'employee_name': employee_name.strip(),
            'salary': int(salary),
            'payroll_month': payroll_month.strip(),
            'payment_status': payment_status.strip(),
            'remarks': remarks.strip()
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
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            # 1. Recalculate hash and verify it matches stored hash
            if current_block.hash != current_block.calculate_hash():
                return False, f"Tampering detected at Block #{current_block.index}: Hash mismatch"

            # 2. Verify previous_hash link matches prior block's hash
            if current_block.previous_hash != previous_block.hash:
                return False, f"Broken link between Block #{previous_block.index} and Block #{current_block.index}"

        return True, "Blockchain Status: VALID. No tampering detected."

    def tamper_block(self, index, new_salary):
        if 0 < index < len(self.chain):
            self.chain[index].data['salary'] = int(new_salary)
            # Notice: We intentionally DO NOT update self.chain[index].hash
            # This simulates unauthorized, fraudulent database row editing!
            return True
        return False
`;

  const appPyContent = `"""
Flask Web Application for VTU BIC702 Payroll Blockchain
Student: Sanjai Shanmuga Prabu (USN: 1SP23IC047)
"""

from flask import Flask, render_template, request, redirect, url_for, flash
from blockchain import PayrollBlockchain

app = Flask(__name__)
app.secret_key = "vtu-bic702-secret-key"

# Instantiate global in-memory blockchain
payroll_chain = PayrollBlockchain()

@app.route('/')
def index():
    is_valid, msg = payroll_chain.validate_chain()
    return render_template('index.html',
                           chain=payroll_chain.chain,
                           total_blocks=len(payroll_chain.chain),
                           payroll_txns=len(payroll_chain.chain) - 1,
                           is_valid=is_valid,
                           status_msg=msg)

@app.route('/add-payroll', methods=['GET', 'POST'])
def add_payroll():
    if request.method == 'POST':
        emp_id = request.form.get('employee_id', '').strip()
        emp_name = request.form.get('employee_name', '').strip()
        salary = request.form.get('salary', '').strip()
        month = request.form.get('payroll_month', '').strip()
        status = request.form.get('payment_status', 'Paid')
        remarks = request.form.get('remarks', '').strip()

        if not emp_id or not emp_name or not salary or not month:
            flash("All mandatory fields must be filled!", "error")
            return redirect(url_for('add_payroll'))

        try:
            sal_num = int(salary)
            if sal_num <= 0:
                raise ValueError
        except ValueError:
            flash("Salary must be a positive integer amount.", "error")
            return redirect(url_for('add_payroll'))

        new_block = payroll_chain.add_payroll_block(emp_id, emp_name, sal_num, month, status, remarks)
        flash(f"Block #{new_block.index} successfully created with SHA-256 hash {new_block.hash[:16]}...", "success")
        return redirect(url_for('view_blockchain'))

    return render_template('add_payroll.html', latest_block=payroll_chain.get_latest_block())

@app.route('/blockchain')
def view_blockchain():
    is_valid, _ = payroll_chain.validate_chain()
    return render_template('blockchain.html', chain=payroll_chain.chain, is_valid=is_valid)

@app.route('/verify')
def verify():
    is_valid, status_msg = payroll_chain.validate_chain()
    return render_template('verify.html', chain=payroll_chain.chain, is_valid=is_valid, status_msg=status_msg)

@app.route('/tamper-demo', methods=['GET', 'POST'])
def tamper_demo():
    if request.method == 'POST':
        block_idx = int(request.form.get('block_index', 1))
        new_sal = int(request.form.get('tampered_salary', 50000))
        payroll_chain.tamper_block(block_idx, new_sal)
        flash(f"Simulated tampering applied: Block #{block_idx} salary altered to ₹{new_sal}.", "warning")
        return redirect(url_for('verify'))

    return render_template('tamper_demo.html', chain=payroll_chain.chain)

@app.route('/load-sample-data')
def load_sample_data():
    if len(payroll_chain.chain) == 1:
        payroll_chain.add_payroll_block("EMP001", "Rahul Kumar", 35000, "September 2026", "Paid", "Demonstration Data")
        payroll_chain.add_payroll_block("EMP002", "Priya Sharma", 42000, "September 2026", "Paid", "Demonstration Data")
        payroll_chain.add_payroll_block("EMP003", "Arjun Rao", 38000, "September 2026", "Pending", "Demonstration Data")
        flash("Loaded 3 demonstration payroll transaction blocks.", "info")
    return redirect(url_for('index'))

@app.route('/reset')
def reset():
    global payroll_chain
    payroll_chain = PayrollBlockchain()
    flash("Blockchain reset to Genesis Block only.", "info")
    return redirect(url_for('index'))

if __name__ == '__main__':
    # Local execution
    app.run(host='0.0.0.0', port=5000, debug=True)
`;

  const requirementsTxtContent = `Flask==3.0.0
Werkzeug==3.0.1
`;

  const getActiveCode = () => {
    switch (activeFile) {
      case 'blockchain.py':
        return blockchainPyContent;
      case 'app.py':
        return appPyContent;
      case 'requirements.txt':
        return requirementsTxtContent;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-fadeIn">
      <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Code2 className="w-6 h-6 text-blue-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Python / Flask Academic Source Code
            </h2>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Pure Python 3 implementation with <code className="text-amber-300 font-mono">hashlib</code> and Flask backend matching VTU Activity 1 requirements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Active File'}</span>
          </button>
        </div>
      </div>

      {/* File selector tabs */}
      <div className="bg-slate-900 rounded-xl border border-slate-750 overflow-hidden shadow-lg">
        <div className="px-4 py-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveFile('blockchain.py')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer ${
                activeFile === 'blockchain.py'
                  ? 'bg-slate-800 text-blue-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              blockchain.py
            </button>
            <button
              onClick={() => setActiveFile('app.py')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer ${
                activeFile === 'app.py'
                  ? 'bg-slate-800 text-blue-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileCode2 className="w-3.5 h-3.5" />
              app.py
            </button>
            <button
              onClick={() => setActiveFile('requirements.txt')}
              className={`px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer ${
                activeFile === 'requirements.txt'
                  ? 'bg-slate-800 text-blue-400 border border-slate-700'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              requirements.txt
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">
            {activeFile === 'blockchain.py' ? 'Python SHA-256 Engine' : activeFile === 'app.py' ? 'Flask Web Controller' : 'Dependencies'}
          </span>
        </div>

        {/* Code view */}
        <div className="p-4 overflow-x-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700">
          <pre className="font-mono text-xs text-slate-300 leading-relaxed select-all whitespace-pre">
            {getActiveCode()}
          </pre>
        </div>
      </div>

      {/* How to Run Locally Guide */}
      <div className="bg-slate-850 rounded-xl p-5 border border-slate-750 space-y-3 text-xs">
        <h3 className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-400" />
          Terminal Commands to Run in College Lab / Home PC
        </h3>
        <div className="bg-slate-950 p-4 rounded-lg font-mono text-slate-300 space-y-2 border border-slate-800 select-all">
          <div className="text-slate-500"># 1. Navigate to project folder</div>
          <div>cd blockchain-payroll</div>
          <div className="text-slate-500"># 2. Install Flask dependencies</div>
          <div>pip install -r requirements.txt</div>
          <div className="text-slate-500"># 3. Launch Flask server</div>
          <div>python app.py</div>
          <div className="text-slate-500"># 4. Open in browser</div>
          <div className="text-emerald-400">http://127.0.0.1:5000</div>
        </div>
      </div>
    </div>
  );
};
