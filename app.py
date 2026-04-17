from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def calculate_trade_score(transactions):
    if not transactions:
        return 400, "D", "High", [{"label": "No Data", "impact": "0", "type": "neutral"}]

    total = len(transactions)
    on_time = late_7 = late_30 = defaults = 0
    amounts = []

    for t in transactions:
        status = t.get('status', '')
        amount = float(t.get('amount', 0))
        amounts.append(amount)
        if 'on time' in status: on_time += 1
        elif '1-7' in status: late_7 += 1
        elif '8-30' in status: late_30 += 1
        elif 'Default' in status: defaults += 1

    # Base Score
    score = 450
    factors = [{"label": "Base Industry Score", "impact": "+450", "type": "positive"}]

    # Payment Behavior Impacts
    on_time_bonus = int((on_time / total) * 200)
    score += on_time_bonus
    if on_time_bonus > 0:
        factors.append({"label": f"{on_time} On-Time Payments", "impact": f"+{on_time_bonus}", "type": "positive"})

    if late_7 > 0:
        penalty = late_7 * 15
        score -= penalty
        factors.append({"label": f"{late_7} Minor Delays (<7d)", "impact": f"-{penalty}", "type": "negative"})

    if late_30 > 0:
        penalty = late_30 * 35
        score -= penalty
        factors.append({"label": f"{late_30} Major Delays (8-30d)", "impact": f"-{penalty}", "type": "negative"})

    if defaults > 0:
        penalty = defaults * 90
        score -= penalty
        factors.append({"label": f"{defaults} Defaults", "impact": f"-{penalty}", "type": "negative"})

    # Volume Impacts
    avg_amount = sum(amounts) / len(amounts)
    if avg_amount > 50000:
        score += 60
        factors.append({"label": "High Trade Volume", "impact": "+60", "type": "positive"})
    elif avg_amount > 25000:
        score += 30
        factors.append({"label": "Healthy Trade Volume", "impact": "+30", "type": "positive"})

    # Growth Trend
    if len(amounts) >= 3 and amounts[-1] > amounts[0]:
        score += 40
        factors.append({"label": "Positive Growth Trend", "impact": "+40", "type": "positive"})

    score = max(300, min(900, int(score)))

    # Grading
    if score >= 750: grade, risk = "A", "Low"
    elif score >= 650: grade, risk = "B", "Low"
    elif score >= 550: grade, risk = "C", "Medium"
    elif score >= 450: grade, risk = "D", "Medium"
    else: grade, risk = "F", "High"

    return score, grade, risk, factors

def generate_insight(score, on_time_pct, avg_amount, growing):
    if score >= 750: return f"Exceptional payment discipline with {int(on_time_pct*100)}% on-time record — ideal candidate for working capital credit."
    elif score >= 650: return f"Strong trade history with average monthly purchases of ₹{int(avg_amount):,} and consistent repayment behavior."
    elif score >= 550: return f"Moderate credit profile — occasional delays noted but overall purchase volume is stable."
    elif score >= 450: return f"Payment irregularities detected. Credit limit recommended with close monitoring."
    else: return f"High risk profile due to defaults. Credit not recommended at this time."

@app.route('/score', methods=['POST'])
def score_kirana():
    data = request.json
    business_name = data.get('business_name', 'Unknown')
    transactions = data.get('transactions', [])

    score, grade, risk, factors = calculate_trade_score(transactions)

    amounts = [float(t.get('amount', 0)) for t in transactions]
    avg_amount = sum(amounts) / len(amounts) if amounts else 0
    on_time_pct = sum(1 for t in transactions if 'on time' in t.get('status','')) / len(transactions) if transactions else 0
    growing = len(amounts) >= 2 and amounts[-1] > amounts[0]

    credit_limit = int(avg_amount * 3 * (score / 900))
    emi = int(credit_limit / 12)
    loan_eligible = score >= 550

    insight = generate_insight(score, on_time_pct, avg_amount, growing)

    return jsonify({
        "success": True,
        "business": business_name,
        "result": {
            "trade_score": score,
            "grade": grade,
            "recommended_credit_limit": credit_limit,
            "risk_level": risk,
            "key_insight": insight,
            "loan_eligible": loan_eligible,
            "monthly_emi_suggestion": emi,
            "score_factors": factors
        }
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)