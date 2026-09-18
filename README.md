# Blockchain-Based Payroll Transaction Log System

**Visvesvaraya Technological University (VTU) – 7th Semester B.E.**  
**Subject:** Blockchain Technology (`BIC702`)  
**Activity:** Activity Based Learning – Activity 1  
**Assigned Topic:** Payroll Transaction Log  

---

## Academic Credentials

- **Student Name:** Sanjai Shanmuga Prabu
- **USN:** `1SP23IC047`
- **Department:** Department of IoT, Cybersecurity and Blockchain Technology
- **Institution:** Visvesvaraya Technological University (VTU)
- **Project Title:** Blockchain-Based Payroll Transaction Log System
- **Activity Number:** Activity 1
- **Course Code:** BIC702

---

## 1. Project Overview

This is a complete, working, presentation-ready academic project developed for VTU Subject **BIC702 (Blockchain Technology)**.

The system demonstrates how blockchain fundamentals—specifically **SHA-256 cryptographic hashing**, **Genesis Block creation**, **block-to-block previous hash linkage**, and **continuous integrity audits**—can be applied to maintain an immutable, tamper-evident payroll transaction log for organizations.

---

## 2. Deliverables Provided

This repository includes two synchronized implementations:
1. **Interactive Web Application (Live Preview / Presentation Ready):**
   - High-fidelity visual dashboard with live metric cards.
   - Dynamic payroll entry form with real-time SHA-256 hash calculation.
   - Visual blockchain explorer with connected block cards and screenshot mode.
   - Cryptographic verification engine with block-by-block audit breakdown.
   - Interactive Tamper Detection Sandbox demonstrating immediate detection of salary edits.
   - Full VTU viva preparation guide with model answers.
   - Built-in Python code viewer and download center.

2. **Standalone Python & Flask Academic Project (`/blockchain-payroll/`):**
   - `blockchain.py`: Clean, standalone Python 3 blockchain engine with SHA-256 via `hashlib`.
   - `app.py`: Flask web controller with Jinja2 templates and styling.
   - `requirements.txt`: Standard Python dependencies (`Flask`, `Werkzeug`).
   - `templates/` & `static/`: Complete HTML/CSS UI matching college submission guidelines.

---

## 3. How to Run

### Option A: Interactive Web UI (AI Studio Live Preview)
The interactive application runs directly in the browser preview.
- **Port:** 3000
- Open the preview to interact with the live blockchain, add transactions, run verification audits, and simulate tampering.

### Option B: Run Standalone Python / Flask Project in College Lab

```bash
# 1. Open terminal and navigate to the python project
cd blockchain-payroll

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the Flask server
python app.py

# 4. Open in browser
http://127.0.0.1:5000
```

---

## 4. Academic Algorithm (12 Steps)

1. **Start** the payroll blockchain system.
2. **Create Genesis Block** as the root element at Index 0.
3. **Set previous hash** of Genesis Block explicitly to `"0"`.
4. **Accept payroll transaction** input: Employee ID, Name, Salary, Month, Payment Status.
5. **Create a new block** with incremented index (`current_index + 1`) and current timestamp.
6. **Store previous block hash** in the new block's `previous_hash` field.
7. **Calculate SHA-256 hash** of concatenated payload: `Index + Timestamp + Data + PreviousHash`.
8. **Add block** to the blockchain list.
9. **Repeat** steps 4 through 8 for all additional payroll transactions.
10. **Validate every block** by checking: (a) Stored Hash == Recalculated Hash, and (b) `Block[i].previous_hash == Block[i-1].hash`.
11. **Display VALID or INVALID** status with detailed diagnostic report.
12. **Stop**.

---

## 5. Software Testing & Verification Matrix

| Test ID | Test Case | Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-01** | Genesis Block Creation | System Start | Block 0 with `previous_hash="0"` | Block #0 initialized with SHA-256 | **PASS** |
| **TC-02** | Add Payroll Block | `EMP001, Rahul Kumar, 35000` | Block #1 created with timestamp & SHA-256 | Block #1 appended to chain | **PASS** |
| **TC-03** | Sequential Linkage | Add `EMP002, Priya Sharma` | Block[2].previous_hash == Block[1].hash | Cryptographic pointer chain intact | **PASS** |
| **TC-04** | Verify Valid Chain | Unmodified ledger | Status: `VALID` (No tampering detected) | Status: `VALID` | **PASS** |
| **TC-05** | Tamper Detection Demo | Modify salary from 35k to 50k | Status: `INVALID` (Tampering detected) | Status: `INVALID`, mismatch flagged | **PASS** |
| **TC-06** | Restore Original Data | Revert modified record | Status: `VALID` (Integrity restored) | Status: `VALID` | **PASS** |

---

## 6. Student Viva Preparation Highlights

- **Genesis Block:** Root block of the blockchain (Index 0). Its previous hash is set to `"0"` because no block precedes it.
- **Avalanche Effect:** A fundamental property of SHA-256 where modifying even a single character in the input completely alters the 64-character hexadecimal digest.
- **Tamper Evidence:** Blockchain provides mathematical proof of unauthorized edits because altering historical data invalidates the stored hash and breaks all subsequent pointer links.
