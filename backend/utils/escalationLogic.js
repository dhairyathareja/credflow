const getTone = (days) => {

    if(days <= 7)
        return "Warm & Friendly";

    if(days <= 14)
        return "Polite but Firm";

    if(days <= 21)
        return "Formal & Serious";

    if(days <= 30)
        return "Stern & Urgent";

    return "Legal Escalation";
};

module.exports = getTone;