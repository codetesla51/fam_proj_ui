// Mock Data

const mockData = {
    members: [
        { id: '1', name: 'Taiwo Odelade', schedule: 'monthly', committedAmount: 50000, status: 'active', lastPaymentDate: '2026-03-15' },
        { id: '2', name: 'Kehinde Odelade', schedule: 'weekly', committedAmount: 10000, status: 'active', lastPaymentDate: '2026-03-20' },
        { id: '3', name: 'Adebayo Odelade', schedule: 'monthly', committedAmount: 25000, status: 'behind', lastPaymentDate: '2026-02-10' },
        { id: '4', name: 'Folake Odelade', schedule: 'weekly', committedAmount: 15000, status: 'active', lastPaymentDate: '2026-03-22' },
        { id: '5', name: 'Emeka Odelade', schedule: 'monthly', committedAmount: 30000, status: 'behind', lastPaymentDate: '2026-01-05' },
        { id: '6', name: 'Ngozi Odelade', schedule: 'monthly', committedAmount: 20000, status: 'active', lastPaymentDate: '2026-03-18' }
    ],
    transactions: [
        { id: '1', memberId: '1', memberName: 'Taiwo Odelade', pool: 'pool1', type: 'credit', amount: 50000, reason: 'Monthly contribution', date: '2026-03-15', receiptUrl: '#' },
        { id: '2', memberId: '2', memberName: 'Kehinde Odelade', pool: 'pool1', type: 'credit', amount: 10000, reason: 'Weekly savings', date: '2026-03-20' },
        { id: '3', memberId: '3', memberName: 'Adebayo Odelade', pool: 'pool1', type: 'credit', amount: 25000, reason: 'Monthly contribution', date: '2026-02-10' },
        { id: '4', memberId: '4', memberName: 'Folake Odelade', pool: 'pool2', type: 'credit', amount: 15000, reason: 'Care fund contribution', date: '2026-03-22' },
        { id: '5', memberId: '5', memberName: 'Emeka Odelade', pool: 'pool1', type: 'debit', amount: 50000, reason: 'Medical expenses payout', date: '2026-03-01' },
        { id: '6', memberId: '6', memberName: 'Ngozi Odelade', pool: 'pool2', type: 'credit', amount: 20000, reason: 'Care fund contribution', date: '2026-03-18' },
        { id: '7', memberId: '1', memberName: 'Taiwo Odelade', pool: 'pool2', type: 'debit', amount: 30000, reason: 'Birthday celebration help', date: '2026-02-28' },
        { id: '8', memberId: '2', memberName: 'Kehinde Odelade', pool: 'pool1', type: 'credit', amount: 10000, reason: 'Weekly savings', date: '2026-03-13' }
    ],
    careFundRequests: [
        { id: '1', memberId: '5', memberName: 'Emeka Odelade', occasion: 'medical', amount: 100000, eventDate: '2026-04-15', description: 'Hospital bills for my father', status: 'pending', createdAt: '2026-03-20' },
        { id: '2', memberId: '3', memberName: 'Adebayo Odelade', occasion: 'wedding', amount: 200000, eventDate: '2026-05-20', description: 'Wedding expenses for my sister', status: 'accepted', createdAt: '2026-03-10' },
        { id: '3', memberId: '6', memberName: 'Ngozi Odelade', occasion: 'birthday', amount: 50000, eventDate: '2026-04-05', status: 'pending', createdAt: '2026-03-22' },
        { id: '4', memberId: '1', memberName: 'Taiwo Odelade', occasion: 'newBaby', amount: 75000, eventDate: '2026-06-01', description: 'New baby supplies', status: 'rejected', rejectionReason: 'Please submit more details', createdAt: '2026-03-05' },
        { id: '5', memberId: '4', memberName: 'Folake Odelade', occasion: 'graduation', amount: 150000, eventDate: '2026-07-15', description: 'Graduation ceremony expenses', status: 'accepted', createdAt: '2026-03-01' }
    ],
    dashboard: {
        pool1Balance: 1250000,
        pool2Balance: 385000,
        totalMembers: 6,
        pendingRequests: 2,
        behindMembers: [
            { name: 'Adebayo Odelade', committed: 25000, saved: 0, gap: 25000 },
            { name: 'Emeka Odelade', committed: 30000, saved: 10000, gap: 20000 }
        ],
        recentPayments: [
            { memberName: 'Folake Odelade', type: 'credit', amount: 15000, date: '2026-03-22', pool: 'pool2' },
            { memberName: 'Kehinde Odelade', type: 'credit', amount: 10000, date: '2026-03-20', pool: 'pool1' },
            { memberName: 'Ngozi Odelade', type: 'credit', amount: 20000, date: '2026-03-18', pool: 'pool2' },
            { memberName: 'Taiwo Odelade', type: 'credit', amount: 50000, date: '2026-03-15', pool: 'pool1' },
            { memberName: 'Emeka Odelade', type: 'debit', amount: 50000, date: '2026-03-01', pool: 'pool1' }
        ]
    }
};
