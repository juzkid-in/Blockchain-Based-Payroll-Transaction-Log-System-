# Blockchain-Based Payroll Transaction Log System

**Visvesvaraya Technological University (VTU) – 7th Semester B.E.**  
**Subject:** Blockchain Technology (`BIC702`)  
**Activity:** Activity Based Learning – Activity 1  
**Assigned Topic:** Payroll Transaction Log  

---

## Student Details

- **Student Name:** Sanjai Shanmuga Prabu
- **USN:** `1SP23IC047`
- **Department:** Department of IoT, Cybersecurity and Blockchain Technology
- **Institution:** Visvesvaraya Technological University (VTU)
- **Academic Year:** 2026–2027

---

## 1. Project Objective

The primary objective of this project is to develop a lightweight, educational, blockchain-based **Payroll Transaction Log System** that records employee compensation events into cryptographically linked blocks and provides real-time verification of ledger integrity using SHA-256 cryptographic hashing.

The application serves as a concrete academic demonstration of how blockchain data structures provide an append-only, tamper-evident audit log without requiring external banking services or public cryptocurrencies.

---

## 2. Key Features

- **Custom Blockchain Engine from Scratch:** Built in Python using standard libraries (`hashlib`, `json`, `datetime`) without depending on external blockchains (like Ethereum or Hyperledger).
- **Genesis Block Initialization:** Automatically seeds Block #0 with index `0`, previous hash `"0"`, and a deterministic initialization message.
- **Dynamic Payroll Block Appending:** Accepts Employee ID, Employee Name, Net Salary, Payroll Month, and Payment Status (Paid/Pending), generating sequential blocks with unique timestamps.
- **Cryptographic Linkage:** Calculates 256-bit SHA-256 hashes where each block mathematically embeds the `previous_hash` of the prior block.
- **Real-Time Blockchain Verification:** Audits the entire ledger by recalculating every block's SHA-256 digest and checking previous hash pointer continuity.
- **Tamper Detection Demonstration Sandbox:** Safe educational feature simulating an unauthorized change to an employee's salary (e.g. from ₹35,000 to ₹50,000) and immediately showing how cryptographic verification fails and flags `Blockchain Status: INVALID`.
- **Reset & Restore:** Instant restoration back to authentic state for clean live viva demonstrations.
- **Pre-Loaded Sample Data:** One-click loading of fictional demonstration records:
  - `EMP001 – Rahul Kumar – ₹35,000 – September 2026 – Paid`
  - `EMP002 – Priya Sharma – ₹42,000 – September 2026 – Paid`
  - `EMP003 – Arjun Rao – ₹38,000 – September 2026 – Pending`

---

## 3. Technologies Used

- **Backend:** Python 3, Flask framework
- **Cryptography:** SHA-256 via Python `hashlib` standard library
- **Frontend:** HTML5, CSS3, JavaScript
- **Data Persistence:** In-memory blockchain data structures (academic demo)

---

## 4. System Architecture

```
HR / ADMIN
    ↓
Payroll Data Entry (Web Form)
    ↓
Payroll Transaction (Canonical JSON Payload)
    ↓
Create Block (Index + Timestamp + Payload)
    ↓
SHA-256 Hashing (Digest = SHA256(Index|Time|Data|PrevHash))
    ↓
Previous Hash Link (Block[N].prev_hash = Block[N-1].hash)
    ↓
Blockchain Ledger (In-Memory Sequential Array)
    ↓
Verification Engine (Continuous Cryptographic Audit)
```

### How the System Works (7 Steps)

1. **Step 1:** HR/Admin enters employee payroll information into the system.
2. **Step 2:** The payroll information is converted into a structured transaction.
3. **Step 3:** The transaction is stored in a new block.
4. **Step 4:** SHA-256 generates the block hash.
5. **Step 5:** The new block stores the previous block's hash.
6. **Step 6:** The blocks form an unbroken chain.
7. **Step 7:** The system validates the chain to detect tampering.

---

## 5. Blockchain Concept Explained

- **SHA-256 Cryptographic Hashing:** Produces a deterministic 64-character hexadecimal digest. Due to the **Avalanche Effect**, modifying a single rupee or character completely scrambles the resulting digest.
- **Immutability & Tamper Evidence:** Modifying a past salary record invalidates its hash. Because the next block holds the original hash as its `previous_hash`, the chain link breaks, making the tampering immediately detectable.
- **Decentralized Verification Concept:** Any auditor or employee can independently recalculate the chain's hashes to verify that historical salary records have remained unmodified.

---

## 6. Project Structure

```
blockchain-payroll/
│
├── app.py                     # Flask web server & route handlers
├── blockchain.py              # Core Block & PayrollBlockchain classes (SHA-256)
├── requirements.txt           # Python package dependencies
├── README.md                  # Project documentation & VTU viva notes
│
├── templates/                 # Jinja2 HTML templates
│   ├── base.html              # Base layout with VTU header & student metadata
│   ├── index.html             # Dashboard with 4 core metrics & recent records
│   ├── add_payroll.html       # Input form for adding payroll transactions
│   ├── blockchain.html        # Visual card chain view with linking arrows
│   ├── verify.html            # Verification breakdown & status report
│   ├── tamper_demo.html       # Academic tampering sandbox (e.g. 35k -> 50k)
│   ├── architecture.html      # Architectural flowchart & 7-step guide
│   └── about.html             # Objectives, problem statement & algorithm
│
└── static/
    ├── style.css              # Custom responsive stylesheet
    └── script.js              # Client-side feedback script
```

---

## 7. Installation & How to Run Locally

### Prerequisites

- Python 3.8 or higher installed on your system.
- `pip` (Python package manager).

### Step-by-Step Commands

```bash
# 1. Clone or navigate to the project directory
cd blockchain-payroll

# 2. (Optional but recommended) Create and activate a virtual environment
python3 -m venv venv
source venv/bin/activate       # On Linux/macOS
# or
venv\Scripts\activate          # On Windows Command Prompt

# 3. Install required packages
pip install -r requirements.txt

# 4. Start the Flask application
python app.py
```

### Accessing the Web Application

Open your browser and navigate to:
```
http://127.0.0.1:5000
```

---

## 8. How to Use the System

1. **View Dashboard:** Upon loading, view the 4 core metrics: Total Blocks, Payroll Transactions, Blockchain Status (`VALID`), and Genesis Block status (`PRESENT`).
2. **Load Sample Data:** Click the **"Load Sample Data"** button to populate the ledger with 3 demonstration payroll blocks.
3. **Add a Payroll Block:** Navigate to **Add Payroll**, enter Employee ID (e.g., `EMP004`), Employee Name (e.g., `Kavita Menon`), Salary (e.g., `45000`), Month, and Status. Click **Add Payroll Transaction**.
4. **Explore the Chain:** Open the **Blockchain** page to see the cards linked sequentially with downward arrows from Genesis Block (Block #0) through each transaction block.
5. **Run Verification:** Click **Verification** to see the recalculation of each block hash and confirm `Blockchain Status: VALID`.
6. **Demonstrate Tampering:** Go to **Tamper Demo**, select Block #1, and modify the salary from ₹35,000 to ₹50,000. Submit to observe the audit failure:
   - `Blockchain Status: INVALID`
   - `Tampering detected at or prior to Block #1`
7. **Restore Chain:** Click **Restore Sample Chain** to return to the authentic state.

---

## 9. Software Testing & Verification Matrix

| Test Case | Description | Input / Scenario | Expected Output | Actual Result | Status |
|---|---|---|---|---|---|
| **TC-01** | Create Genesis Block | System initialization | Genesis Block #0 created with `prev_hash="0"` | Block #0 initialized with SHA-256 hash | **PASS** |
| **TC-02** | Add Payroll Transaction | `EMP001, Rahul Kumar, 35000` | Block #1 created with timestamp & SHA-256 | Block #1 created and linked to Block #0 | **PASS** |
| **TC-03** | Sequential Linkage | Add EMP002, EMP003 | Block[N].previous_hash == Block[N-1].hash | Cryptographic pointer chain unbroken | **PASS** |
| **TC-04** | Verify Valid Chain | Unmodified ledger | Status: `VALID` (No tampering detected) | Status: `VALID` | **PASS** |
| **TC-05** | Tamper Detection Demo | Modify EMP001 salary to 50000 | Status: `INVALID` (Tampering detected) | Status: `INVALID`, mismatch flagged | **PASS** |
| **TC-06** | Restore Original Data | Revert modified record | Status: `VALID` (Integrity restored) | Status: `VALID` | **PASS** |

---

## 10. Expected Output

- **Console Output on Server Start:**
  ```text
  * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
  ```
- **Valid Blockchain Status:**
  ```text
  Blockchain Status: VALID
  No tampering detected. All block hashes and links intact.
  ```
- **Tampered Blockchain Status:**
  ```text
  Blockchain Status: INVALID
  Tampering detected at Block #1: Stored hash does not match recalculated SHA-256 digest.
  ```

---

## 11. Project Limitations (Academic Scope)

- **Demonstration Scope:** This project is designed for academic presentation under VTU Course BIC702.
- **In-Memory Storage:** Blocks are stored in server memory. (Can be extended to SQLite for persistent multi-session logs).
- **No Cryptocurrency / Proof-of-Work:** Consensus mining is omitted as this models an internal organizational audit log rather than an anonymous public financial network.

---

## 12. Future Scope

- Integration with **SQLite / PostgreSQL** for durable file-backed persistence.
- Implementation of **Digital Signatures (ECDSA / RSA)** where each payroll transaction is digitally signed with HR's private key.
- Export of audit certificates in PDF format with embedded QR verification codes.
- Multi-organization consortium network using permissioned Hyperledger Fabric.

---

## 13. VTU Viva-Voce Questions & Answers

1. **Q: What are the contents of a Block in your project?**  
   *A:* Block Index, Timestamp, Payroll Transaction Data (Employee ID, Name, Salary, Month, Payment Status), Previous Hash, and Current SHA-256 Hash.

2. **Q: Why does the Genesis Block have a previous hash of `"0"`?**  
   *A:* The Genesis Block is Block 0, the first block in the ledger. Because no block precedes it, its previous hash is set to `"0"` by convention.

3. **Q: What is the Avalanche Effect in SHA-256?**  
   *A:* It is a cryptographic property where changing even a single character in the input data results in a radically different, unpredictable 64-character hexadecimal digest.

4. **Q: How does the system detect tampering?**  
   *A:* The validation function recomputes the SHA-256 digest of each block using its current fields and compares it to the stored hash. If an unauthorized edit was made to salary, the recomputed hash diverges, immediately flagging the chain as `INVALID`.
