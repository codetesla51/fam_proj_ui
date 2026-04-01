// i18n - Complete Translations for 5 Languages
const translations = {
    en: {
        app: { name: "Odelade Family Ledger", tagline: "Your family savings, all in one place" },
        nav: {
            home: "Home", mySavings: "My Savings", personalSavings: "Personal Savings",
            myHistory: "My History", settings: "Settings", notifications: "Alerts",
            recordPayment: "Record Payment", familySavings: "Family Savings",
            helpRequests: "Withdrawals", familyMembers: "Family Members"
        },
        auth: {
            yourName: "Your Name", yourNamePlaceholder: "e.g. Taiwo Odelade",
            password: "Password", signIn: "Sign In", createAccount: "Create My Account",
            fullName: "Your Full Name", fullNameHelper: "Enter your name as the family knows you",
            createPassword: "Create a Password", createPasswordHelper: "Choose something you will remember",
            confirmPassword: "Confirm Password", confirmPasswordHelper: "Type your password again",
            managerPassword: "Manager Password", signInAsManager: "Sign In as Manager",
            backToFamily: "Back to family login",
            alreadyHave: "Already have an account?", noAccount: "Don't have an account?",
            wrongCredentials: "Wrong name or password. Please try again.",
            welcomeBack: "Welcome back", signInDesc: "Sign in to see your family savings",
            newHere: "New here?", joinFamily: "Join the Odelade Family",
            savedTogether: "Saved Together"
        },
        register: {
            howOften: "How often will you save?", howMuch: "How much will you save each time?",
            howMuchHelper: "The amount you plan to save regularly",
            whenStart: "When are you starting?", whenStartHelper: "The month you begin saving",
            everyWeek: "Every Week", everyMonth: "Every Month"
        },
        member: {
            greeting: { morning: "Good morning", afternoon: "Good afternoon", evening: "Good evening", night: "Good night" },
            familySavings: "Family Savings", personalSavings: "Personal Savings",
            lastPayment: "Last Payment", alerts: "Alerts",
            upToDate: "You are up to date", behind: "You are behind on savings",
            recentPayments: "Recent Payments", requestHelp: "Request Family Help",
            noPayments: "No payments recorded yet. Your family manager will record your first payment.",
            historyDesc: "All your transactions across both funds",
            savingsHistory: "Your Family Savings history",
            mySavings: "My Savings", familyActivity: "Family Activity",
            myHistory: "My History", transfer: "Transfer", settings: "Settings"
        },
        admin: {
            familyOverview: "Family Overview", totalMembers: "Family Members",
            pendingRequests: "Pending Withdrawals", behindOnSavings: "Behind on Savings",
            allUpToDate: "All family members are up to date",
            shouldSave: "Should Save", hasSaved: "Has Saved", gap: "Gap",
            quickActions: "Quick Actions", recordPayment: "Record a Payment",
            addMember: "Add Family Member", reviewRequests: "Review Withdrawals",
            dashboardDesc: "Family savings at a glance",
            members: "Family Members", behindTitle: "Members Behind on Savings",
            active: "active", transactions: "Transactions", careFund: "Withdrawal Requests", dashboard: "Dashboard"
        },
        transfer: {
            title: "Transfer",
            description: "Move money from your Personal Savings to Family Savings",
            howMuch: "How much do you want to transfer?",
            maximum: "Maximum available",
            available: "Available now",
            currentBalance: "Current balance",
            howItWorks: "How It Works",
            step1: "Enter the amount you want to transfer",
            step2: "Confirm the transfer from your Personal Savings to Family Savings",
            step3: "Your Family Savings balance will increase instantly"
        },
        table: {
            date: "Date", type: "Type", amount: "Amount", reason: "Reason",
            proof: "Proof", member: "Member", fund: "Fund", status: "Status",
            showAll: "Show All", all: "All", moneyIn: "Money In", moneyOut: "Money Out",
            totalIn: "Total In", totalOut: "Total Out", netBalance: "Net Balance"
        },
        transaction: {
            recordPayment: "Record a Payment", whichMember: "Which family member?",
            whichFund: "Which fund?", whatType: "What type?",
            howMuch: "How much?", whatFor: "What is this for?",
            whatForHelper: "e.g. Monthly contribution, Medical bill",
            attachProof: "Attach proof of payment", recordBtn: "Record Payment",
            familyMoneyHistory: "Family Money History"
        },
        careFund: {
            balance: "Personal Savings Balance", requestHelp: "Withdraw from Savings",
            pastRequests: "Past Withdrawals", noRequests: "You have not made any withdrawals yet",
            whatFor: "What is this for?", howMuchNeed: "How much do you need?",
            whenOccasion: "When is the occasion?", tellMore: "Tell us more",
            optional: "optional", sendRequest: "Request Withdraw", accept: "Accept",
            accepted: "Approved", pending: "Pending", notApproved: "Declined"
        },
        members: {
            addMember: "Add Family Member", fullName: "Full Name",
            password: "Password", passwordHelper: "They can change this later",
            howOften: "How often will they save?", howMuchEach: "How much each time?",
            startingFrom: "Starting from?", resetPassword: "Reset Password"
        },
        settings: {
            myDetails: "My Details", changePassword: "Change Password",
            currentPassword: "Current Password", newPassword: "New Password",
            confirmNew: "Confirm New Password", language: "Language",
            installApp: "Install App", installPrompt: "Add to your home screen for faster access",
            install: "Install", iosInstructions: "Tap share, then Add to Home Screen",
            dismiss: "Dismiss", contactManager: "Contact the family manager to change your name",
            savingsSettings: "Savings Settings", savingsInterval: "How often do you save?",
            committedAmount: "How much do you save each time?",
            committedAmountHelper: "The amount you plan to save regularly"
        },
        common: {
            save: "Save", cancel: "Cancel", loading: "Loading...",
            error: "Something went wrong. Please try again.", success: "Success!",
            markAllRead: "Mark all as read", allCaughtUp: "You are all caught up",
            selected: "Selected", markRead: "Mark read",
            weekly: "Every Week", monthly: "Every Month",
            backOnline: "Back online ✓",
            offlineShowingSaved: "You are offline — showing last saved data",
            back: "Back", viewReceipt: "View receipt", justNow: "Just now",
            yesterday: "Yesterday", confirm: "Confirm", delete: "Delete",
            edit: "Edit", close: "Close", search: "Search", noData: "No data",
            upToDate: "Up to date", new: "New", earlier: "Earlier",
            noNewNotifications: "No new notifications",
            alertsCaughtUp: "You're all caught up!",
            alertsCatchUpDesc: "When you have new alerts, they'll show up here. Stay tuned!",
            thisMonthSavings: "This month's savings",
            membersContributing: "family members contributing",
            familyManager: "Family Manager",
            familyManagerAccess: "Family Manager Access",
            newMember: "New Member",
            manageAccount: "Manage your account",
            recentActivity: "Recent Activity", viewAll: "View all",
            yourContributions: "Your contributions", yourBalance: "Your balance",
            totalPool1: "Total Pool 1", transfer: "Transfer",
            requestWithdraw: "Request Withdraw", transferNow: "Transfer Now",
            familyOverview: "Family Overview", quickActions: "Quick Actions",
            recordPayment: "Record Payment", addMember: "Add Member",
            reviewRequests: "Review Requests", allUpToDate: "All members are up to date",
            active: "Active", inactive: "Inactive", tryAgain: "Try again",
            unread: "unread", markAllRead: "Mark all read",
            previous: "Previous", next: "Next", page: "Page", of: "of",
            receiptNumber: "Receipt No.",
            member: "Member", from: "From", to: "To", date: "Date", time: "Time"
        },
        validation: { required: "This field is required", passwordMismatch: "Passwords do not match" },
        occasions: { birthday: "Birthday", wedding: "Wedding", newBaby: "New Baby", graduation: "Graduation", medical: "Medical", other: "Other" },
        ui: {
            mySavings: "My Savings", myHistory: "My History", familyActivity: "Family Activity",
            personalSavings: "Personal Savings", familySavings: "Family Savings",
            transfer: "Transfer", myProfile: "My Profile", viewReceipt: "View Receipt",
            noPaymentsYet: "No payments recorded yet", paymentsRecorded: "payments recorded",
            totalSaved: "Total Saved", totalWithdrawn: "Total Withdrawn",
            clear: "Clear", allActivity: "All Activity", memberActivity: "Member Activity"
        },
        errors: {
            tryAgain: "Something went wrong, please try again",
            pageNotFound: "Page not found",
            pageNotFoundDesc: "The page you are looking for does not exist",
            userNotFound: "We don't recognize that name",
            wrongPassword: "Wrong password. Please try again.",
            notAdmin: "You are not an admin",
            useAdminLogin: "Please use admin login",
            networkError: "No internet connection. Please check your network.",
            serverError: "Something went wrong. Please try again later.",
            sessionExpired: "Your session expired. Please login again.",
            unauthorized: "Please login to continue",
            invalidRequest: "Invalid information. Please check and try again.",
            insufficientFunds: "Not enough money in the fund",
            transferFailed: "Transfer failed. Please try again.",
            uploadFailed: "Upload failed. Please try again."
        }
    },
    yo: {
        app: { name: "Odelade Family Ledger", tagline: "Owo ifowopamọ́ rẹ ibẹ̀, gbogbo ní ìkan" },
        nav: {
            home: "Ile", mySavings: "Owo Ti Mo Fi Pamọ́", personalSavings: "Owo Ti Mo",
            myHistory: "Itan Owo Mi", settings: "Ètò", notifications: "Alertsì",
            recordPayment: "Kọ̀ Owo", familySavings: "Owo Ifowopamọ́ Ará",
            helpRequests: "Ìrànwọ́", familyMembers: "Àwọn Ará"
        },
        auth: {
            yourName: "Oruko Rẹ", yourNamePlaceholder: "e.g. Taiwo Odelade",
            password: "Ọ̀ọ́pọ̀", signIn: "Ṣe àlàáfià", createAccount: "Ṣe Àkọ̀ọ́lá Mi",
            fullName: "Orukọ Fúlànlọ̀", fullNameHelper: "Fọwọ́ si oruko rẹ bi a ti mọ̀ rẹ",
            createPassword: "Ṣe Ọ̀ọ́pọ̀ Tuntun", createPasswordHelper: "Yan nkan ti o ranti",
            confirmPassword: "Ṣe ìdájú Ọ̀ọ́pọ̀", confirmPasswordHelper: "Tẹ ọ̀ọ́pọ̀ rẹ lẹ́ẹ̀kan sí",
            managerPassword: "Ọ̀ọ́pọ̀ Oniṣọ̀", signInAsManager: "Ṣe àlàáfià bi Oniṣọ̀",
            back: "Padà sí ìwọlé ará", backToFamily: "Padà sí ìwọlé ará",
            welcomeBack: "Ku àbọ̀", signInDesc: "Ṣe àlàáfià lati wo owo ifowopamọ́ rẹ",
            newHere: "Ṣé o jẹ tuntun níbí?", joinFamily: "Darapọ mọ Ìdílé Odelade", savedTogether: "A ti fipamọ papọ",
            alreadyHave: "Ti o ni akọ̀ọ́ba?", noAccount: "Ko si akọ̀ọ́ba?", wrongCredentials: "Oruko tabi ọ̀ọ́pọ̀ kuna. Jọ̀wọ́ gbiyanju lẹ́ẹ̀kan si."
        },
        transfer: {
            title: "Gbigbe Owo",
            description: "Gbe owo láti Owo Ti Mo sí Owo Ifowopamọ́ Ará",
            howMuch: "Meloo ni o fẹ gbe?",
            maximum: "Iye tó pọ̀ jù lọ",
            available: "O wa ní báyìí",
            currentBalance: "Iye tó wà nísisìyí",
            howItWorks: "Bí ó ṣe n ṣiṣẹ́",
            step1: "Tẹ iye tí o fẹ gbe",
            step2: "Jẹ́risi gbigbẹ láti Owo Ti Mo sí Owo Ifowopamọ́ Ará",
            step3: "Iye Owo Ifowopamọ́ Ará yóò pọ̀ sí i lẹsẹkẹsẹ"
        },
        register: {
            howOften: "Igbofu owo ro?", howMuch: "Meloo ni o ma fi pamọ́ lọ́ọ̀?",
            howMuchHelper: "Owo ti o pinnu lati fi pamọ́ nigbagbogbo",
            whenStart: "Nigbati o ma bẹ̀rẹ̀?", whenStartHelper: "Oṣù ti o ma bẹ̀rẹ̀",
            everyWeek: "Ọ̀sẹ̀ kọ̀ọ̀kan", everyMonth: "Oṣù kọ̀ọ̀kan"
        },
        member: {
            greeting: { morning: "Ẹ káàárọ̀", afternoon: "Ẹ kíàlù", evening: "Ẹ kíșùșù", night: "Ẹ kí àșálẹ̀" },
            familySavings: "Owo Ifowopamọ́ Ará", personalSavings: "Owo Ti Mo",
            lastPayment: "Owo Ikẹhin", alerts: "Alertsì",
            upToDate: "O ti wa ni akọ̀ọ́", behind: "O ti kuna",
            recentPayments: "Owo Ajù", requestHelp: "Ibéèrè Ìrànwọ́",
            noPayments: "Ko si owo ti a kọ̀ sí. Oniṣọ̀ rẹ ma kọ̀ owo akọ̀ọ́ba rẹ akọ̀ọ́.",
            historyDesc: "Gbogbo ise owo rẹ",
            savingsHistory: "Itan Owo Ifowopamọ́ Ará", mySavings: "Owo Ti Mo Fi Pamọ́", familyActivity: "Ise Awọn Ará",
            myHistory: "Itan Owo Mi", transfer: "Gbigbe Owo", settings: "Ètò"
        },
        admin: {
            familyOverview: "Ayo Ise Ará", totalMembers: "Àwọn Ará",
            pendingRequests: "Ibéèrè Ti O duro", behindOnSavings: "Ti o kuna",
            allUpToDate: "Gbogbo ara ti wa ni okowe",
            shouldSave: "Yio fi pamọ́", hasSaved: "Ti o ti fi pamọ́", gap: "Ikuna",
            quickActions: "Ise Yiyara", recordPayment: "Kọ̀ Owo",
            addMember: "Ṣe Ará Tuntun", reviewRequests: "Review Ìrànwọ́",
            dashboardDesc: "Ayo owo ifowopamọ́",
            members: "Àwọn Ará", behindTitle: "Àwọn Ará Ti o Kuna", active: "ni active", transactions: "Ise Owo", careFund: "Ibéèrè Ìrànwọ́", dashboard: "Ile-iṣẹ́"
        },
        table: { date: "Ọjọ́", type: "Irú", amount: "Iye", reason: "Ìdí", proof: "Ìfihan", member: "Ará", fund: "Ibi", status: "Ipọ́", showAll: "Fihàn gbogbo", all: "Gbogbo", moneyIn: "Owo Wọlé", moneyOut: "Owo Lọ", totalIn: "Gbogbo ti wọlé", totalOut: "Gbogbo ti lọ", netBalance: "Iye ti o ku" },
        transaction: { recordPayment: "Kọ̀ Owo", whichMember: "Ará wo?", whichFund: "Ibi wo?", whatType: "Irú wo?", howMuch: "Melo?", whatFor: "Kini?", whatForHelper: "e.g. Owo osù, Owo ilera", attachProof: "Fi ìfihan han", recordBtn: "Kọ̀ Owo", familyMoneyHistory: "Itan Owo Ará" },
        careFund: { balance: "Owo Ti O ku", requestHelp: "Yi owo na", pastRequests: "Ibéèrè Àtijọ́", noRequests: "O ko ti béèrè ohunkan", whatFor: "Kini eleyi?", howMuchNeed: "Meloo ni o nira?", whenOccasion: "Nigbati?", tellMore: "Sọ̀ diẹ̀", optional: "laikafi", sendRequest: "Fi ìbéèrè rán", accept: "Gba", accepted: "Ti gba", pending: "Ndun", notApproved: "Ko gba" },
        members: { addMember: "Ṣe Ará Tuntun", fullName: "Orukọ Fúlànlọ̀", password: "Ọ̀ọ́pọ̀", passwordHelper: "Wọn le yi pada lẹ́ẹ̀kan", howOften: "Igbofu owo ro?", howMuchEach: "Meloo ni?", startingFrom: "Bẹ̀rẹ̀ láti?", resetPassword: "Yii Ọ̀ọ́pọ̀" },
        settings: { myDetails: "Àkọ̀ọ́ba Mi", changePassword: "Yi Ọ̀ọ́pọ̀ Pada", currentPassword: "Ọ̀ọ́pọ̀ Lọ́wọ́", newPassword: "Ọ̀ọ́pọ̀ Tuntun", confirmNew: "Yi ìdájú Ọ̀ọ́pọ̀", language: "Èdè", installApp: "Fọ̀nà App", installPrompt: "Fọ̀nà si homescreen rẹ fun irọ̀gẹ̀", install: "Fọ̀nà", iosInstructions: "Tap share, then Add to Home Screen", dismiss: "Fagilee", contactManager: "Pe oniṣọ̀", savingsSettings: "Ètò Ifowopamọ́", savingsInterval: "Igbofu owo?", committedAmount: "Meloo ni o fi pamọ́?", committedAmountHelper: "Owo ti o pinnu lati fi pamọ́" },
        common: {
            save: "Fipamọ́", cancel: "Fagilee", loading: "Nnkan ntẹ̀...",
            error: "Nnkan ti lọ̀. Jọ̀wọ́ gbiyanju lẹ́ẹ̀kan si.", success: "Ti ṣeé!",
            markAllRead: "Mark gbogbo ni o ti ka", allCaughtUp: "O ti pari",
            selected: "Ti yan", markRead: "Samisi gẹ́gẹ́ bí a ti ka",
            weekly: "Ọ̀sẹ̀ kọ̀ọ̀kan", monthly: "Oṣù kọ̀ọ̀kan",
            backOnline: "Nẹ́tíwọ́ọ̀kì ti padà ✓",
            offlineShowingSaved: "O wà ní àìní nẹ́tíwọ́ọ̀kì — a n fi data tó ti fipamọ hàn",
            back: "Padà", viewReceipt: "Wo Resi", justNow: "Nìsẹ́yì",
            yesterday: "Alẹ́", confirm: "F确认", delete: "Paarẹ̀",
            edit: "Yíi pada", close: "Pade", search: "Wadi", noData: "Ko si data",
            upToDate: "Ti wa ni akọ̀ọ́", new: "Tuntun", earlier: "Nígbàtẹ̀wọ́",
            noNewNotifications: "Ko si iwifun tuntun",
            alertsCaughtUp: "O ti pari!",
            alertsCatchUpDesc: "Nigbati o ni iwifun tuntun, wọn ma han nibi. Yọ́ò!",
            thisMonthSavings: "Owo osù yii",
            membersContributing: "awon ara ti nikan",
            familyManager: "Oniṣọ̀ Ará",
            familyManagerAccess: "Iwọle Oniṣọ̀",
            newMember: "Ará Tuntun",
            manageAccount: "Ṣàkóso àkọ̀ọ́ba rẹ",
            recentActivity: "Ise Ti o Kọja", viewAll: "Wo gbogbo",
            yourContributions: "Owo ti o fi ran", yourBalance: "Owo rẹ",
            totalPool1: "Pulu 1", transfer: "Gbigbe",
            requestWithdraw: "Ibéèrè Yiyo", transferNow: "Gbe Bayi",
            familyOverview: "Ayo Ise Ará", quickActions: "Ise Yiyara",
            recordPayment: "Kọ̀ Owo", addMember: "Ṣe Ará",
            reviewRequests: "Review Ìrànwọ́", allUpToDate: "Gbogbo ara ti wa ni akọ̀ọ́",
            active: "Active", inactive: "Inactive", tryAgain: "Gbiyanju lẹ́ẹ̀kan si",
            unread: "ti o ka", markAllRead: "Mark gbogbo ka",
            previous: "Tẹ́lẹ̀", next: "Tó kàn", page: "Ojúewé", of: "nínú",
            receiptNumber: "Nọ́mbà Ìwé-ẹri",
            member: "Ará", from: "Láti", to: "Sí", date: "Ọjọ́", time: "Àkókò"
        },
        validation: { required: "A nilo eleyi", passwordMismatch: "Ọ̀ọ́pọ̀ kii to" },
        occasions: { birthday: "Ọjọ́ ibi", wedding: "Ìgbéyàwó", newBaby: "Ọmọ tuntun", graduation: "Graduation", medical: "Ilera", other: "Ọ̀nà" },
        ui: { mySavings: "Owo Ti Mo Fi Pamọ́", myHistory: "Itan Owo Mi", familyActivity: "Ise Awọn Ará", personalSavings: "Owo Ti Mo", familySavings: "Owo Ifowopamọ́ Ará", transfer: "Gbigbe Owo", myProfile: "Ìfipamọ́ Mi", viewReceipt: "Wo Resi", noPaymentsYet: "Ko si owo ti a kọ̀", paymentsRecorded: "owo ti a kọ̀", totalSaved: "Gbogbo Ti A Fi Pamọ́", totalWithdrawn: "Gbogbo Ti A Yiyo", clear: "Korí", allActivity: "Gbogbo Ise", memberActivity: "Ise Ara" },
        errors: { tryAgain: "Nnkan ti lọ. Jọ̀wọ́ gbiyanju.", pageNotFound: "A ko rí oju opo", pageNotFoundDesc: "Oju yii ko si.", userNotFound: "A ko mọ̀ orukọ yii", wrongPassword: "Ọ̀ọ́pọ̀ kuna. Jọ̀wọ́ gbiyanju.", notAdmin: "O ko ni Oniṣọ̀", useAdminLogin: "Jọ̀wọ́ lo ìwọlé Oniṣọ̀", networkError: "Ko si nẹ́tọ́ọ̀kì. Jọ̀wọ́ ṣàyẹ̀wò.", serverError: "Nnkan ti lọ. Jọ̀wọ́ gbiyanju.", sessionExpired: "Session ti pari. Jọ̀wọ́ ṣe àlàáfià lẹ́ẹ̀kan si.", unauthorized: "Jọ̀wọ́ ṣe àlàáfià lati tẹ̀síwájú", invalidRequest: "Ail信息. Jọ̀wọ́ ṣàyẹ̀wò.", insufficientFunds: "Ko si owo ga", transferFailed: "Transfer kuna. Gbiyanju.", uploadFailed: "Upload kuna. Gbiyanju." }
    },
    ig: {
        app: { name: "Odelade Family Ledger", tagline: "Ego nchekwa gi ni otu ebe" },
        nav: { home: "Họm", mySavings: "M Nche", personalSavings: "Nke M", myHistory: "Akụkọ M", settings: "Nhazi", notifications: "Mkparị", recordPayment: "Dee ego", familySavings: "Nchekwa Ezinụlọ", helpRequests: "Nrịgbu", familyMembers: "Ndị Ezinụlọ" },
        auth: { yourName: "Aha Gi", yourNamePlaceholder: "e.g. Taiwo Odelade", password: "Paswọọdụ", signIn: "Banye", createAccount: "Mepụta Akaụntụ M", fullName: "Aha Nfull", fullNameHelper: "Dị aha gi dịka ezinụlọ ma ama gi", createPassword: "Mepụta Paswọọdụ", createPasswordHelper: "Họrọ ihe ị ga echeta", confirmPassword: "Kwado Paswọọdụ", confirmPasswordHelper: "Dị paswọọdụ ahụ ọzọ", managerPassword: "Paswọọdụ Onye Nchịkwa", signInAsManager: "Banye dịka Onye Nchịkwa", back: "Lagachi n'ụlọ", backToFamily: "Lagachi n'ụlọ ezinụlọ", welcomeBack: "Nabata", signInDesc: "Banye ka i nwee ike ilele ego nchekwa gi", signInDescription: "Banye ka i nwee ike ilele ego nchekwa gi", newHere: "Ị bụ onye ọhụrụ ebe a?", joinFamily: "Jikọọ ezinụlọ Odelade", savedTogether: "E chekwara ọnụ", alreadyHave: "I nwere akaụntụ?", noAccount: "Enwetaghi akaụntụ?", wrongCredentials: "Aha ma ọ bụ paswọọdụ ezighi eche. Mee mgbalị ọzọ." },
        register: { howOften: "Olile anya ị na-echekwa?", howMuch: "Ego ole ka i ga-echekwa?", howMuchHelper: "Ego ị na-atụle ịchekwa mgbe niile", whenStart: "Gịnị bụ oge ịmalite?", whenStartHelper: "Ọnwa ị malitere", everyWeek: "Ka ịtụn", everyMonth: "Ka ọnwa" },
        member: { greeting: { morning: "Ọtụtụ", afternoon: "Ehihie", evening: "Mgbede", night: "Abalị" }, familySavings: "Nchekwa Ezinụlọ", personalSavings: "Nke M", lastPayment: "Ịkwụsị ego", alerts: "Mkparị", upToDate: "I na-eme ka ogo", behind: "I dịghị na mgbago", recentPayments: "Ịkwụsị ndị na-adịbeghị anya", requestHelp: "Ịrịọ Enyemaka", noPayments: "Enweghị ịkwụsị ego etinyegoro. Onye nchịkwa gi ga-ede ịkwụsị ego mbụ.", historyDesc: "Edemede nke gị niile", savingsHistory: "Akụkọ Nchekwa Ezinụlọ", mySavings: "M Nche", familyActivity: "Omume Ezinụlọ", myHistory: "Akụkọ M", transfer: "Mgbanwe", settings: "Nhazi" },
        admin: { familyOverview: "Ncheta Ezinụlọ", totalMembers: "Ndị Ezinụlọ", pendingRequests: "Arịrịọ ndị na-echere", behindOnSavings: "Nọ n'azụ", allUpToDate: "Ndị ezinụlọ niile dị na ogo", shouldSave: "Ha kwesịrị ichekwa", hasSaved: "Echekwala", gap: "Ọdịiche", quickActions: "Omume ngwa ngwa", recordPayment: "Dee ịkwụsị ego", addMember: "Tinye onye ọhụrụ", reviewRequests: "Lelee Arịrịọ", dashboardDesc: "Ncheta nchekwa ezinụlọ", members: "Ndị Ezinụlọ", behindTitle: "Ndị Ezinụlọ Nọ n'azụ", active: "na-arụ ọrụ", transactions: "Ịkwụsị ego", careFund: "Arịrịọ", dashboard: "Dashboard" },
        transfer: { title: "Mgbanwe", description: "Bugharịa ego si na Nchekwa Nke M gaa Nchekwa Ezinụlọ", howMuch: "Ego ole ka ị chọrọ ibugharị?", maximum: "Oke kachasị", available: "Dị ugbu a", currentBalance: "Rọndụ ugbu a", howItWorks: "Otu o si arụ ọrụ", step1: "Tinye ego ịchọrọ ibugharị", step2: "Kwenye mgbagharị site na Nchekwa Nke M gaa Nchekwa Ezinụlọ", step3: "Rọndụ Nchekwa Ezinụlọ ga-abawanye ozugbo" },
        table: { date: "Ụbọchị", type: "Ụdị", amount: "Ego", reason: "Ihe kpatara", proof: "Ihe akaebe", member: "Onye", fund: "Ụlọ", status: "Ọnọdụ", showAll: "Hụ niile", all: "Niile", moneyIn: "Ego Abịa", moneyOut: "Ego Apụ", totalIn: "Ngụkọta Mgbawa", totalOut: "Ngụkọta Mputa", netBalance: "Ngụkọta" },
        transaction: { recordPayment: "Dee Ịkwụsị ego", whichMember: "Onye ọbụla?", whichFund: "Ụlọ ọbụla?", whatType: "Ụdị ọbụla?", howMuch: "Ego ole?", whatFor: "Gịnị?", whatForHelper: "e.g. Ịkwụsị owu, Ego ọgwụ", attachProof: "Tinye akaebe", recordBtn: "Dee Ịkwụsị", familyMoneyHistory: "Akụkọ Ego Ezinụlọ" },
        careFund: { balance: "Nchekwa Nke M", requestHelp: "Wepụta ego", pastRequests: "Arịrịọ ndị adịghị edé", noRequests: "I gwụchaghị arịrịọ", whatFor: "Gịnị nke a?", howMuchNeed: "Ego ole i chọrọ?", whenOccasion: "Oge bụ?", tellMore: "Kọwaa", optional: "nhọrọ", sendRequest: "ziga arịrịọ", accept: "Nabata", accepted: "Nabata", pending: "Na-echere", notApproved: "Anabataghị" },
        members: { addMember: "Tinye onye ọhụrụ", fullName: "Aha zuru ezu", password: "Paswọọdụ", passwordHelper: "Ha nwere ike ịgbanwe ya mgbe e mesịrị", howOften: "Olile anya ị na-echekwa?", howMuchEach: "Ego ole?", startingFrom: "Malite?", resetPassword: "Tọgharịa paswọọdụ" },
        settings: { myDetails: "M banyere", changePassword: "Gbanwee paswọọdụ", currentPassword: "Paswọọdụ dị adị", newPassword: "Paswọọdụ ọhụrụ", confirmNew: "Kwado Paswọọdụ ọhụrụ", language: "Asụsụ", installApp: "Wụnye App", installPrompt: "Tinye na home screen gị", install: "Wụnye", iosInstructions: "Tapo share, ma tinye Add to Home Screen", dismiss: "Wepụ", contactManager: "Kpọ onye nchịkwa", savingsSettings: "Nhazi Nchekwa", savingsInterval: "Ọgụgụ ị na-echekwa?", committedAmount: "Ego ole i na-echekwa?", committedAmountHelper: "Ego ị na-atụle ịchekwa mgbe niile" },
        common: { save: "Chekwaa", cancel: "Gbochie", loading: "Na-ebuli...", error: "E mesịịrị. Mee mgbalị ọzọ.", success: "Ọ dịla!", markAllRead: "Doo niile ka a gụọrụ", allCaughtUp: "I gụchara niile", selected: "A họrọla", markRead: "Kaa dị ka agụla", weekly: "Kwa izu", monthly: "Kwa ọnwa", backOnline: "Ị laghachila n'ịntanetị ✓", offlineShowingSaved: "Ị nọ offline — a na-egosi data echekwara", back: "Lagachi", viewReceipt: "Lelee akaụntụ", justNow: "N'oge a", yesterday: "Neefi", confirm: "Kwado", delete: "Hichapụ", edit: "Dezie", close: "Mechaa", search: "Chọọ", noData: "Enweghị data", upToDate: "Nọ na ogo", new: "ọhụrụ", earlier: "Tupu", noNewNotifications: "Enweghị mkparị ọhụrụ", alertsCaughtUp: "I gụchara niile!", alertsCatchUpDesc: "Mgbe i nwere mkparị ọhụrụ, ha ga-egosi ebe a.", thisMonthSavings: "Nchekwa ọnwa a", membersContributing: "ndị ezinụlọ na-ekere", familyManager: "Onye Nchịkwa Ezinụlọ", familyManagerAccess: "Ịnweta Onye Nchịkwa", newMember: "Onye ọhụrụ", manageAccount: "Jikwaa akaụntụ gị", recentActivity: "Omume Na-adịbeghị anya", viewAll: "Hụ niile", yourContributions: "I nyere", yourBalance: "Nke gi", totalPool1: "Ụlọ 1", transfer: "Mgbanwe", requestWithdraw: "Arịrịọ wepụ", transferNow: "Mgbanwe ugbu a", familyOverview: "Ncheta Ezinụlọ", quickActions: "Omume ngwa ngwa", recordPayment: "Dee Ịkwụsị", addMember: "Tinye onye", reviewRequests: "Lelee Arịrịọ", allUpToDate: "Ndị niile dị na ogo", active: "Active", inactive: "Inactive", tryAgain: "Mee mgbalị ọzọ", unread: "a gụọ", markAllRead: "Do niile", previous: "Nke gara aga", next: "Nke na-esote", page: "Ibe", of: "nke", receiptNumber: "Nọmba risiti", member: "Onye", from: "Site na", to: "Ruo", date: "Ụbọchị", time: "Oge" },
        validation: { required: "A chọrọ nke a", passwordMismatch: "Paswọọdụ adịghị otu" },
        occasions: { birthday: "Ubọchị mụpụ", wedding: "Alụso", newBaby: "Ụmụ ọhụrụ", graduation: "Graduation", medical: "ọgwụ", other: "Ọzọ" },
        ui: { mySavings: "M Nche", myHistory: "Akụkọ M", familyActivity: "Omume Ezinụlọ", personalSavings: "Nke M", familySavings: "Nchekwa Ezinụlọ", transfer: "Mgbanwe", myProfile: "M banyere", viewReceipt: "Lelee akaụntụ", noPaymentsYet: "Enweghị ịkwụsị ego etinyegoro", paymentsRecorded: "ịkwụsị edere", totalSaved: "Ngụkọta Niile Echekwa", totalWithdrawn: "Ngụkọta Niile Wepụtara", clear: "Hụpụ", allActivity: "Omume Niile", memberActivity: "Omume Onye" },
        errors: { tryAgain: "E mesịịrị. Mee mgbalị ọzọ.", pageNotFound: "Peegi ahụ adịghị", pageNotFoundDesc: "Peegi i chọrọ adịghị.", userNotFound: "Anyị amaghị aha a", wrongPassword: "Paswọọdụ ezighi eche. Mee mgbalị ọzọ.", notAdmin: "I abụghị onye nchịkwa", useAdminLogin: "Biko jiri nbanye onye nchịkwa", networkError: "Enwetaghị netwọk. Biko leba anya.", serverError: "E mesịịrị. Biko gbalịa.", sessionExpired: "Nzọụkwụ ewepụtaghị. Biko tinye aka.", unauthorized: "Biko banye ka i tinye aka", invalidRequest: "Ozi ezighi eche. Biko lelee.", insufficientFunds: "Enweghị ego", transferFailed: "Mgbanwe emeighị. Gbalịa.", uploadFailed: "Upload emeighị. Gbalịa." }
    },
        ha: {
            app: { name: "Odelade Family Ledger", tagline: "Kudin iyaliya nan a cikin wuri guda" },
            nav: { home: "Gida", mySavings: "Kudina", personalSavings: "Na", myHistory: "Tarihi", settings: "Saituna", notifications: "Garga", recordPayment: "Rigar kudi", familySavings: "Kudin Dangi", helpRequests: "Taimako", familyMembers: "Mambobin Dangi" },
            transfer: { title: "Canja", description: "Canja kuɗi daga ajiyar ka zuwa ajiyar iyali", howMuch: "Nawa kake son canjawa?", maximum: "Mafi yawan da ake da shi", available: "Akwai yanzu", currentBalance: "Ragowar yanzu", howItWorks: "Yadda Aiki Yake", step1: "Shigar da adadin da kake son canja", step2: "Tabbatar da canja daga Personal Savings zuwa Family Savings", step3: "Balance ɗin Family Savings zai ƙara nan take" },
        auth: { yourName: "Suna", yourNamePlaceholder: "e.g. Taiwo Odelade", password: "Kalmar sirri", signIn: "Shiga", createAccount: "Ƙirƙiri asusu", fullName: "Cikakken sunan", fullNameHelper: "Shigar da sunan ka kamar yadda iyaliya ke sani", createPassword: "Ƙirƙiri kalmar sirri", createPasswordHelper: "Zabi abin da za ka tuna", confirmPassword: "Tabbatar da kalmar sirri", confirmPasswordHelper: "Saka kalmar sirri sau biyu", managerPassword: "Kalmar sirrin gudanarwa", signInAsManager: "Shiga a matsayin gudanarwa", back: "Koma zuwa shiga iyaliya", backToFamily: "Koma zuwa shiga iyaliya", welcomeBack: "Barka da dawowa", signInDesc: "Shiga don ganin kudin ajiyar ka", signInDescription: "Shiga don ganin kudin ajiyar ka", newHere: "Sabon mai amfani ne?", joinFamily: "Shiga Iyalan Odelade", savedTogether: "Mun tara tare", alreadyHave: "Kana da asusu?", noAccount: "Baka da asusu?", wrongCredentials: "Suna ko kalmar sirri ba daidai ba. Da fatan sake gwadawa." },
        register: { howOften: "shine ya ajiye?", howMuch: "nawa za ka ajiye?", howMuchHelper: "abin da kake shirye ajiye kullum", whenStart: "yanzu ya fara?", whenStartHelper: "watan da za ka fara", everyWeek: "mako mako", everyMonth: "wata mako" },
        member: { greeting: { morning: "safe", afternoon: "lafiya", evening: "ya amurka", night: "gobe" }, familySavings: "Kudin Dangi", personalSavings: "Na", lastPayment: "Bayanin karshe", alerts: "Garga", upToDate: "kayi girma", behind: "kuna baya", recentPayments: "Bayanin kwanakin nan", requestHelp: "Buƙaci taimako", noPayments: "Bayanin ba a rubuta ba. Gudanarwa zai rubuta farkon biyan ka.", historyDesc: "dukkan ayyukan ka", savingsHistory: "Tarihin kudin dangi", mySavings: "Kudina", familyActivity: "Aikin Dangi", myHistory: "Tarihi", transfer: "Canja", settings: "Saituna" },
        admin: { familyOverview: "Gani na Dangi", totalMembers: "Mambobin dangi", pendingRequests: "Buƙatar jiran", behindOnSavings: "bayanin baya", allUpToDate: "dukkan mambobin gida suna kan hanya", shouldSave: "Ya kamata ajiye", hasSaved: "ayi ajiye", gap: "gabatarwa", quickActions: "Ayyuka masu sauri", recordPayment: "Rigar kudi", addMember: "Ƙara member", reviewRequests: "Bitar buƙatu", dashboardDesc: "Gani kudin dangi", members: "Mambobin Dangi", behindTitle: "Mambobin baya", active: "aiki", transactions: "Madadin kuɗi", careFund: "Buƙatar taimako", dashboard: "Dashboard" },
        table: { date: "Kwanar", type: "Nauyi", amount: "Adadin", reason: "Dalili", proof: "Hujja", member: "Mamba", fund: "Asusu", status: "Yanayin", showAll: "Nuna duk", all: "Duk", moneyIn: "kuɗin shiga", moneyOut: "kuɗin fita", totalIn: "Jimlar shigowa", totalOut: "Jimlar fitowa", netBalance: "Jimlar" },
        transaction: { recordPayment: "Rigar kudi", whichMember: "wanda member?", whichFund: "wanda dasu?", whatType: "wanda type?", howMuch: "nawa?", whatFor: "me?", whatForHelper: "e.g. ajiyar wata, kudin gida", attachProof: "Manzo hujja", recordBtn: "Rigar kudi", familyMoneyHistory: "Tarihin kuɗin dangi" },
        careFund: { balance: "Ajiyayyen kudi", requestHelp: "Bobowar fitar da", pastRequests: "Buƙatun da suka wuce", noRequests: "baka buƙaci komai ba", whatFor: "me wannan?", howMuchNeed: "nawa kuke buƙata?", whenOccasion: "yanzu?", tellMore: "faɗi kuma", optional: "optional", sendRequest: "aika buƙata", accept: "Amince", accepted: "an amince", pending: "a jiran", notApproved: "an ki amince" },
        members: { addMember: "Ƙara member", fullName: "Cikakken sunan", password: "Kalmar sirri", passwordHelper: "za su iya canjawa", howOften: "shine ajiye?", howMuchEach: "nawa kowane?", startingFrom: "farawa?", resetPassword: "sake kalmar sirri" },
        settings: { myDetails: "Bayanina", changePassword: "Canjawa kalmar sirri", currentPassword: "Kalmar sirri ta yanzu", newPassword: "Sabuwar kalmar sirri", confirmNew: "Tabbatar da sabuwar kalmar sirri", language: "Harshe", installApp: "Shigar da app", installPrompt: "Shigar da na home screen", install: "Shigar", iosInstructions: "tuba share, sannan Add to Home Screen", dismiss: "A", contactManager: "tuntuɓi gudanarwa", savingsSettings: "Saitunan ajiye", savingsInterval: "yawan ajiye?", committedAmount: "nawa kake ajiye?", committedAmountHelper: "abin da kake shirye ajiye kullum" },
        common: { save: "Ajiyayye", cancel: "A", loading: "shigar da...", error: "makaru. Da fatan sake gwadawa.", success: "ayi nasara!", markAllRead: "duk karanta", allCaughtUp: "kayi cikakken", selected: "An zaɓa", markRead: "Alama an karanta", weekly: "Kowane mako", monthly: "Kowane wata", backOnline: "An dawo online ✓", offlineShowingSaved: "Kana offline — ana nuna bayanan da aka adana", back: "koma", viewReceipt: "dub receipt", justNow: "yanzu", yesterday: "hi", confirm: "Tabbatar", delete: "goge", edit: "sauya", close: "kure", search: "bincika", noData: "babu data", upToDate: "kan hanya", new: "sabo", earlier: "da", noNewNotifications: "babu sanarwa sabo", alertsCaughtUp: "kayi cikakken!", alertsCatchUpDesc: "idan kana da sabbin sanarwa, za su bayyana nan. a shirya!", thisMonthSavings: "ajiyar watan nan", membersContributing: "mambobin dangi", familyManager: "Gudanarwar Dangi", familyManagerAccess: "Gudanarwar damu", newMember: "Sabon member", manageAccount: "gudanar da asusuka", recentActivity: "Ayyukan da suka wuce", viewAll: "duk", yourContributions: "kayi", yourBalance: "na", totalPool1: "Rumbun 1", transfer: "Canja", requestWithdraw: "Buƙaci fitar", transferNow: "Canja yanzu", familyOverview: "Gani na Dangi", quickActions: "Ayyuka masu sauri", recordPayment: "Rigar kudi", addMember: "Ƙara", reviewRequests: "bitar buƙatu", allUpToDate: "dukkan suna kan hanya", active: "Active", inactive: "Inactive", tryAgain: "sake gwadawa", unread: "ba karanta", markAllRead: "duk karanta", previous: "Na baya", next: "Na gaba", page: "Shafi", of: "na", receiptNumber: "Lambar rasit", member: "Mamba", from: "Daga", to: "Zuwa", date: "Kwana", time: "Lokaci" },
        validation: { required: "ana buƙata", passwordMismatch: "kalmar sirri ba daidai ba" },
        occasions: { birthday: "ranar haihuwa", wedding: "auren", newBaby: "sabonaci", graduation: "kammala karatun", medical: "magani", other: "waje" },
        ui: { mySavings: "Kudina", myHistory: "Tarihi", familyActivity: "Aikin Dangi", personalSavings: "Na", familySavings: "Kudin Dangi", transfer: "Canja", myProfile: "Bayanina", viewReceipt: "dub receipt", noPaymentsYet: "bayanin ba a rubuta ba", paymentsRecorded: "bayanin da aka rubuta", totalSaved: "Jimlar ajiye", totalWithdrawn: "Jimlar fitar", clear: "Goge", allActivity: "Dukan ayyuka", memberActivity: "Aikin mamba" },
        errors: { tryAgain: "makaru. Da fatan sake gwadawa.", pageNotFound: "ba a same shi ba", pageNotFoundDesc: "shafi da kuke nema ba sabbi.", userNotFound: "ba a san wannan suna ba", wrongPassword: "kalmar sirri ba daidai ba. Da fatan sake gwadawa.", notAdmin: "ba ka gudanarwa ba", useAdminLogin: "Da fatan shiga gudanarwa", networkError: "babu intanit. Da fatan duba.", serverError: "makaru. Da fatan sake gwadawa.", sessionExpired: "lokaci ya ƙare. Da fatan sake shiga.", unauthorized: "Da fatan shiga don ci gaba", invalidRequest: "bayani ba daidai ba. Da fatan duba.", insufficientFunds: "babu kudi", transferFailed: "canja ba ya yi nasara. Gani.", uploadFailed: "upload ba ya yi nasara. Gani." }
    },
    ar: {
        app: { name: "دفتر عائلة أوديلادي", tagline: "مدخرات عائلتك في مكان واحد" },
        nav: { home: "الرئيسية", mySavings: "مدخراتي", personalSavings: "الشخصي", myHistory: "سجلاتي", settings: "الإعدادات", notifications: "الإشعارات", recordPayment: "تسجيل دفع", familySavings: "مدخرات العائلة", helpRequests: "طلبات المساعدة", familyMembers: "أفراد العائلة" },
        auth: { yourName: "اسمك", yourNamePlaceholder: "مثال: تايوو أوديلادي", password: "كلمة المرور", signIn: "تسجيل الدخول", createAccount: "إنشاء حسابي", fullName: "اسمك الكامل", fullNameHelper: "أدخل اسمك كما تعرفه العائلة", createPassword: "إنشاء كلمة مرور", createPasswordHelper: "اختر شيئاً ستتذكره", confirmPassword: "تأكيد كلمة المرور", confirmPasswordHelper: "أعد كتابة كلمة المرور", managerPassword: "كلمة مرور المسؤول", signInAsManager: "تسجيل دخول كمسؤول", back: "العودة لتسجيل العائلة", backToFamily: "العودة لتسجيل العائلة", welcomeBack: "مرحباً بعودتك", signInDesc: "سجّل دخولك لرؤية مدخرات عائلتك", newHere: "جديد هنا؟", joinFamily: "انضم إلى عائلة أوديلادي", savedTogether: "ادخرنا معاً", alreadyHave: "لديك حساب؟", noAccount: "ليس لديك حساب؟", wrongCredentials: "الاسم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى." },
        register: { howOften: "كم مرة ستوفر؟", howMuch: "كم ستوفر في كل مرة؟", howMuchHelper: "المبلغ الذي تخطط لتوفيره بانتظام", whenStart: "متى ستبدأ؟", whenStartHelper: "الشهر الذي تبدأ فيه", everyWeek: "كل أسبوع", everyMonth: "كل شهر" },
        member: { greeting: { morning: "صباح الخير", afternoon: "ظهر الخير", evening: "مساء الخير", night: "تصبح على خير" }, familySavings: "مدخرات العائلة", personalSavings: "الشخصي", lastPayment: "آخر دفعة", alerts: "تنبيهات", upToDate: "أنت على اطلاع", behind: "لست على اطلاع", recentPayments: "آخر المدفوعات", requestHelp: "طلب مساعدة", noPayments: "لم يتم تسجيل أي مدفوعات بعد. سيقوم مدير عائلتك بتسجيل أول دفعة.", historyDesc: "جميع معاملاتك", savingsHistory: "سجل مدخرات العائلة", mySavings: "مدخراتي", familyActivity: "نشاط العائلة", myHistory: "سجلاتي", transfer: "تحويل", settings: "الإعدادات" },
        admin: { familyOverview: "نظرة عامة على العائلة", totalMembers: "أفراد العائلة", pendingRequests: "طلبات معلقة", behindOnSavings: "متأخر في التوفير", allUpToDate: "جميع أفراد العائلة على اطلاع", shouldSave: "يجب أن يوفر", hasSaved: "وفر", gap: "الفجوة", quickActions: "إجراءات سريعة", recordPayment: "تسجيل دفعة", addMember: "إضافة عضو", reviewRequests: "مراجعة الطلبات", dashboardDesc: "نظرة سريعة على مدخرات العائلة", members: "أفراد العائلة", behindTitle: "الأعضاء المتأخرين", active: "نشط", transactions: "المعاملات", careFund: "طلبات المساعدة", dashboard: "لوحة التحكم" },
        table: { date: "التاريخ", type: "النوع", amount: "المبلغ", reason: "السبب", proof: "الإثبات", member: "العضو", fund: "الصندوق", status: "الحالة", showAll: "عرض الكل", all: "الكل", moneyIn: "داخل", moneyOut: "خارج", totalIn: "الإجمالي الداخل", totalOut: "الإجمالي الخارج", netBalance: "الرصيد" },
        transfer: { title: "تحويل", description: "انقل المال من مدخراتك الشخصية إلى مدخرات العائلة", howMuch: "كم تريد أن تحول؟", maximum: "الحد الأقصى المتاح", available: "متاح الآن", currentBalance: "الرصيد الحالي", howItWorks: "كيف يعمل", step1: "أدخل المبلغ الذي تريد تحويله", step2: "أكد التحويل من المدخرات الشخصية إلى مدخرات العائلة", step3: "سيزيد رصيد مدخرات عائلتك فوراً" },
        transaction: { recordPayment: "تسجيل دفعة", whichMember: "أي عضو؟", whichFund: "أي صندوق؟", whatType: "أي نوع؟", howMuch: "كم؟", whatFor: "لأي غرض؟", whatForHelper: "مثال: مساهمة شهرية، فاتورة طبية", attachProof: "إرفاق إثبات", recordBtn: "تسجيل الدفعة", familyMoneyHistory: "سجل أموال العائلة" },
        careFund: { balance: "رصيد المدخرات الشخصية", requestHelp: "سحب من المدخرات", pastRequests: "الطلبات السابقة", noRequests: "لم تقدم أي طلبات بعد", whatFor: "ما هذا؟", howMuchNeed: "كم تحتاج؟", whenOccasion: "متى المناسبة؟", tellMore: "أخبرنا أكثر", optional: "اختياري", sendRequest: "إرسال الطلب", accept: "قبول", accepted: "موافق", pending: "قيد الانتظار", notApproved: "مرفوض" },
        members: { addMember: "إضافة عضو", fullName: "الاسم الكامل", password: "كلمة المرور", passwordHelper: "يمكنهم تغييرها لاحقاً", howOften: "كم مرة سيوفر؟", howMuchEach: "كم في كل مرة؟", startingFrom: "يبدأ من؟", resetPassword: "إعادة تعيين كلمة المرور" },
        settings: { myDetails: "بياناتي", changePassword: "تغيير كلمة المرور", currentPassword: "كلمة المرور الحالية", newPassword: "كلمة مرور جديدة", confirmNew: "تأكيد كلمة المرور الجديدة", language: "اللغة", installApp: "تثبيت التطبيق", installPrompt: "أضف إلى شاشتك الرئيسية للوصول الأسرع", install: "تثبيت", iosInstructions: "انقر على مشاركة، ثم أضف إلى الشاشة الرئيسية", dismiss: "رفض", contactManager: "اتصل بالمسؤول", savingsSettings: "إعدادات التوفير", savingsInterval: "كم مرة توفر؟", committedAmount: "كم توفر في كل مرة؟", committedAmountHelper: "المبلغ الذي تخطط لتوفيره بانتظام" },
        common: { save: "حفظ", cancel: "إلغاء", loading: "جاري التحميل...", error: "حدث خطأ. يرجى المحاولة مرة أخرى.", success: "نجاح!", markAllRead: "تحديد الكل كمقروء", allCaughtUp: "لديك كل شيء", selected: "تم الاختيار", markRead: "تحديد كمقروء", weekly: "كل أسبوع", monthly: "كل شهر", backOnline: "عدت للاتصال ✓", offlineShowingSaved: "أنت غير متصل — نعرض آخر بيانات محفوظة", back: "رجوع", viewReceipt: "عرض الإيصال", justNow: "الآن", yesterday: "أمس", confirm: "تأكيد", delete: "حذف", edit: "تعديل", close: "إغلاق", search: "بحث", noData: "لا توجد بيانات", upToDate: "على اطلاع", new: "جديد", earlier: "أقدم", noNewNotifications: "لا توجد إشعارات جديدة", alertsCaughtUp: "لديك كل شيء!", alertsCatchUpDesc: "عندما يكون لديك إشعارات جديدة، ستظهر هنا. تابع!", thisMonthSavings: "مدخرات هذا الشهر", membersContributing: "أفراد العائلة الموفرون", familyManager: "مدير العائلة", familyManagerAccess: "وصول المدير", newMember: "عضو جديد", manageAccount: "إدارة حسابك", recentActivity: "النشاط الأخير", viewAll: "عرض الكل", yourContributions: "مساهماتك", yourBalance: "رصيدك", totalPool1: "الصندوق 1", transfer: "تحويل", requestWithdraw: "طلب سحب", transferNow: "تحويل الآن", familyOverview: "نظرة عامة على العائلة", quickActions: "إجراءات سريعة", recordPayment: "تسجيل دفعة", addMember: "إضافة عضو", reviewRequests: "مراجعة الطلبات", allUpToDate: "الجميع على اطلاع", active: "نشط", inactive: "غير نشط", tryAgain: "المحاولة مرة أخرى", unread: "غير مقروء", markAllRead: "تحديد الكل", previous: "السابق", next: "التالي", page: "صفحة", of: "من", receiptNumber: "رقم الإيصال", member: "العضو", from: "من", to: "إلى", date: "التاريخ", time: "الوقت" },
        validation: { required: "هذا الحقل مطلوب", passwordMismatch: "كلمات المرور غير متطابقة" },
        occasions: { birthday: "عيد ميلاد", wedding: "زفاف", newBaby: "مولود جديد", graduation: "تخرج", medical: "طبي", other: "أخرى" },
        ui: { mySavings: "مدخراتي", myHistory: "سجلاتي", familyActivity: "نشاط العائلة", personalSavings: "الشخصي", familySavings: "مدخرات العائلة", transfer: "تحويل", myProfile: "ملفي", viewReceipt: "عرض الإيصال", noPaymentsYet: "لا توجد مدفوعات مسجلة", paymentsRecorded: "مدفوعات مسجلة", totalSaved: "إجمالي المدخر", totalWithdrawn: "إجمالي المسحوب", clear: "مسح", allActivity: "كل النشاط", memberActivity: "نشاط العضو" },
        errors: { tryAgain: "حدث خطأ. يرجى المحاولة مرة أخرى.", pageNotFound: "الصفحة غير موجودة", pageNotFoundDesc: "الصفحة التي تبحث عنها غير موجودة.", userNotFound: "لا نعرف هذا الاسم", wrongPassword: "كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.", notAdmin: "لست مسؤولاً", useAdminLogin: "يرجى استخدام تسجيل دخول المسؤول", networkError: "لا يوجد اتصال بالإنترنت. يرجى التحقق.", serverError: "حدث خطأ. يرجى المحاولة لاحقاً.", sessionExpired: "انتهت جلستك. يرجى تسجيل الدخول مرة أخرى.", unauthorized: "يرجى تسجيل الدخول للمتابعة", invalidRequest: "معلومات غير صالحة. يرجى التحقق.", insufficientFunds: "لا يوجد رصيد كافٍ", transferFailed: "فشل التحويل. يرجى المحاولة مرة أخرى.", uploadFailed: "فشل الرفع. يرجى المحاولة مرة أخرى." }
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
const rtlLangs = ['ar'];

function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang] || translations.en;
    for (const k of keys) {
        value = (value && typeof value === 'object') ? value[k] : undefined;
    }
    if (typeof value === 'string') return value;
    let english = translations.en;
    for (const k of keys) {
        english = (english && typeof english === 'object') ? english[k] : undefined;
    }
    return typeof english === 'string' ? english : '';
}

function setLang(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    
    // Set RTL for Arabic
    if (rtlLangs.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
    
    closeLangModal();
    
    // Re-render current page
    if (typeof router !== 'undefined' && router.render) {
        router.render();
    }
    updateLangButtons();
}

function openLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) {
        modal.classList.remove('hidden');
    }
    updateLangButtons();
}

function closeLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const check = btn.querySelector('.check');
        if (btn.dataset.lang === currentLang) {
            if (check) check.classList.remove('hidden');
            btn.classList.add('bg-brand-light', 'text-brand');
        } else {
            if (check) check.classList.add('hidden');
            btn.classList.remove('bg-brand-light', 'text-brand');
        }
    });
}

// Initialize RTL on page load
(function initLang() {
    if (rtlLangs.includes(currentLang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
    }
})();

const langNames = { en: 'English', yo: 'Yorùbá', ig: 'Igbo', ha: 'Hausa', ar: 'العربية' };

function getCurrentLangName() {
    return langNames[currentLang] || 'English';
}
