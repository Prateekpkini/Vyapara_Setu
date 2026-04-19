# 🏪 Vyapara Setu 

**The Behavioural Finance & Supply Chain Protocol** *Digitising Offline Trust. Engineering Financial Literacy. Preventing MSME Debt Traps.*

[![Hackathon](https://img.shields.io/badge/Hackathon-Hackfest26-blue)](#) 
[![Track](https://img.shields.io/badge/Track-Fintech-success)](#)

---

## ⚠️ The Dual-Headed Problem

India's informal economy is facing a massive crisis that traditional banking cannot solve:
1. **The Credit Crisis:** 6.19 crore Indian MSMEs face a ₹30 lakh crore credit gap. A Kirana store with no formal bank history is invisible to CIBIL — even after 10 years of flawless payments to their distributor.
2. **The Behavioural Crisis:** When uneducated shopkeepers *do* access capital, cognitive biases take over. Herd mentality, festive FOMO, and impulsive investments drive over-borrowing and inventory stockpiling, creating inescapable debt traps.

**The Core Insight:** Handing out debt without practical financial literacy isn't a solution—it's a trap. We need to catch MSMEs at the moment of financial overconfidence *before* the loan is signed.

---

## 💡 The Solution: Vyapara Setu

Vyapara Setu is a B2B Credit Intelligence platform that digitizes physical ledgers (Khatabook) to unlock low-interest formal capital, while deploying AI gatekeepers and a gamified twin-economy to ensure that capital is used to build wealth, not destroy it.

### 🌟 Core Features

* **📊 Network Digitisation & Saakh Score (TradeScore):** Distributors log daily B2B wholesale transactions. Our AI extracts this structured intelligence (payment velocity, trade volume growth) to generate an institutional-grade score (300-900) for unbanked Kirana stores.
* **🎮 Gamified Sandbox (Investment Lab):** A zero-risk "flight simulator" equipped with a ₹100,000 Play-Coin wallet. It empowers Kirana owners to practice capital allocation without risking actual business funds.
* **📈 Real-World Mirroring ("The Twin"):** Live API integration tracking real-time macroeconomic data including **NIFTY 50**, **MCX Gold**, and **Fixed Deposit (FD)** rates. Shopkeepers learn asset relationships using live market data.
* **🚨 Active Intervention ("The Trap"):** The system algorithmically engineers sudden market anomalies (e.g., an MCX Gold "pump-and-dump") to actively trigger and test user biases like FOMO and greed.
* **🧠 System 2 Forcing (AI Gatekeeper):** When a high-risk or impulsive trade is attempted, the AI Gatekeeper freezes the UI. It forces the user to shift from fast, impulsive thinking (System 1) to slow, analytical thinking (System 2) by requiring a typed, rational business justification before executing the trade.
* **⚡ 1-Click NBFC Origination:** Enriched TradeScores are passed to lending partners via a direct pipeline, enabling 90-second working capital loan approvals for healthy, well-justified requests.

---

## 🏗️ Technology Stack

* **Frontend (UI/UX):** React.js / Vanilla JS, HTML5, CSS3 (Mobile-first, gamified dashboard designed for non-technical users).
* **Data Visualization:** Chart.js / D3.js (Interactive Trade Graphs to prove creditworthiness).
* **Backend (Core Logic):** Node.js for high-throughput, low-latency transaction processing and ledger management.
* **AI / NLP Engine:** Python (Flask) API for analyzing text rationales during System 2 interventions and dynamically computing the Saakh Score.
* **External Integrations:** APIs simulating NBFC endpoints and live macroeconomic data feeds powering the Vyapar-Twin sandbox.

---

## ⚙️ Architecture Flow

1.  **Transaction Log:** Distributor logs daily B2B transactions / Kirana owner uploads bank passbooks & GST data.
2.  **Data Ingestion:** Data is processed and the AI Engine generates a verifiable Saakh Score (Trade Graph).
3.  **Loan Application:** Kirana owner applies for a seasonal loan.
4.  **AI Gatekeeper Assessment:** * *If Rational:* Routed directly to NBFC partner.
    * *If Irrational/FOMO Detected:* Diverted to the **Vyapar-Twin Sandbox** to simulate EMI impact and force rational justification.
5.  **Disbursement:** NBFC Partner approves the loan and capital is disbursed directly to the Kirana's bank account.

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v16+)
* Python (3.9+)
* pip
