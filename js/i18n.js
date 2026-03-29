// i18n - Translations
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
            welcomeBack: "Welcome back"
        },
        register: {
            howOften: "How often will you save?", howMuch: "How much will you save each time?",
            howMuchHelper: "The amount you plan to save regularly",
            whenStart: "When are you starting?", whenStartHelper: "The month you begin saving",
            everyWeek: "Every Week", everyMonth: "Every Month"
        },
        member: {
            greeting: { 
                morning: "Good morning",
                afternoon: "Good afternoon",
                evening: "Good evening",
                night: "Good night"
            },
            familySavings: "Family Savings", personalSavings: "Personal Savings",
            lastPayment: "Last Payment", alerts: "Alerts",
            upToDate: "You are up to date", behind: "You are behind on savings",
            recentPayments: "Recent Payments", requestHelp: "Request Family Help",
            noPayments: "No payments recorded yet. Your family manager will record your first payment.",
            historyDesc: "All your transactions across both funds",
            savingsHistory: "Your Family Savings history"
        },
        admin: {
            familyOverview: "Family Overview", totalMembers: "Family Members",
            pendingRequests: "Pending Withdrawals", behindOnSavings: "Behind on Savings",
            allUpToDate: "All family members are up to date",
            shouldSave: "Should Save", hasSaved: "Has Saved", gap: "Gap",
            quickActions: "Quick Actions", recordPayment: "Record a Payment",
            addMember: "Add Family Member", reviewRequests: "Review Withdrawals",
            dashboardDesc: "Family savings at a glance",
            members: "Members", behindTitle: "Members Behind on Savings",
            active: "active"
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
            optional: "optional", sendRequest: "Request Withdraw",
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
            install: "Install", iosInstructions: "Tap share, then 'Add to Home Screen'",
            dismiss: "Dismiss", contactManager: "Contact the family manager to change your name",
            savingsSettings: "Savings Settings", savingsInterval: "How often do you save?",
            committedAmount: "How much do you save each time?",
            committedAmountHelper: "The amount you plan to save regularly"
        },
        common: {
            save: "Save", cancel: "Cancel", loading: "Loading...",
            error: "Something went wrong. Please try again.", success: "Success!",
            markAllRead: "Mark all as read", allCaughtUp: "You are all caught up",
            back: "Back", viewReceipt: "View receipt", justNow: "Just now",
            yesterday: "Yesterday", confirm: "Confirm", delete: "Delete",
            edit: "Edit", close: "Close", search: "Search", noData: "No data",
            active: "Active",
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
            reviewRequests: "Review Requests", allUpToDate: "All members are up to date"
        },
        ui: {
            mySavings: "My Savings",
            myHistory: "My History",
            familyActivity: "Family Activity",
            personalSavings: "Personal Savings",
            familySavings: "Family Savings",
            transfer: "Transfer",
            myProfile: "My Profile",
            viewReceipt: "View Receipt",
            noPaymentsYet: "No payments recorded yet",
            paymentsRecorded: "payments recorded",
            totalSaved: "Total Saved",
            totalWithdrawn: "Total Withdrawn",
            clear: "Clear",
            allActivity: "All Activity",
            memberActivity: "Member Activity"
        },
        transfer: {
            title: "Transfer from Personal Savings to Savings",
            description: "Move money from Personal Savings to Family Savings",
            howMuch: "How much to transfer?",
            available: "Available to transfer",
            currentBalance: "Current balance",
            maximum: "Maximum",
            howItWorks: "How it works",
            step1: "Money moves from your Personal Savings to your Family Savings",
            step2: "This is one-way only - you cannot transfer back",
            step3: "Transfer is instant and cannot be undone"
        },
        validation: { required: "This field is required", passwordMismatch: "Passwords do not match" },
        yo: {
            ui: {
                mySavings: "Owo Ti Mo Fi Pamọ́",
                myHistory: "Itan Owo Mi",
                familyActivity: "Ise Awọn Ará",
                personalSavings: "Owo Ti Mo",
                familySavings: "Owo Ifowopamọ́ Ará",
                transfer: "Gbigbe Owo",
                myProfile: "Ìfipamọ́ Mi",
                viewReceipt: "Wo Resi",
                noPaymentsYet: "Ko si owo ti a kọ̀",
                paymentsRecorded: "owo ti a kọ̀",
                totalSaved: "Gbogbo Ti A Fi Pamọ́",
                totalWithdrawn: "Gbogbo Ti A Yiyo",
                clear: "Korí",
                allActivity: "Gbogbo Ise",
                memberActivity: "Ise Ara"
            }
        },
        ig: {
            ui: {
                mySavings: "M Nche",
                myHistory: "Akụkọ M",
                familyActivity: "Omume Ezinụlọ",
                personalSavings: "Nke M",
                familySavings: "Nchekwa Ezinụlọ",
                transfer: "Mgbanwe",
                myProfile: "M banyere",
                viewReceipt: "Lelee akaụntụ",
                noPaymentsYet: "Enweghị ọgwụ ọma",
                paymentsRecorded: "ọgwụ edere",
                totalSaved: "Ngụkọta Ego Echekwa",
                totalWithdrawn: "Ngụkọta Ego Wepụ",
                clear: "Hụpụ",
                allActivity: "Omume Niile",
                memberActivity: "Omume Onye"
            }
        },
        ha: {
            ui: {
                mySavings: "Kudina",
                myHistory: "Tarihi",
                familyActivity: "Aikin Dangi",
                personalSavings: "Na Ub",
                familySavings: "Kudin Dangi",
                transfer: "Canja",
                myProfile: "Bayanina",
                viewReceipt: "Dubi rusull",
                noPaymentsYet: "Babu biyan da aka rubuta",
                paymentsRecorded: "biyan da aka rubuta",
                totalSaved: "Jimlar ajiyar",
                totalWithdrawn: "Jimlar fitarwa",
                clear: "Goge",
                allActivity: "Duka aiki",
                memberActivity: "Aikin mutum"
            }
        },
        errors: {
            pageNotFound: "Page Not Found",
            pageNotFoundDesc: "The page you're looking for doesn't exist.",
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
            uploadFailed: "Upload failed. Please try again.",
            tryAgain: "Something went wrong. Please try again."
        },
        occasions: {
            birthday: "Birthday", wedding: "Wedding", newBaby: "New Baby",
            graduation: "Graduation", medical: "Medical", other: "Other"
        }
    },
    yo: {
        app: { name: "Odelade Family Ledger", tagline: "Owo igbasilẹ̀ ìdàgbàsókè" },
        nav: { home: "Àkọ́kọ́", mySavings: "Owo Ti Mo Fi Pamọ́", personalSavings: "Owo Ti Mo", myHistory: "Itan Owo Mi", settings: "Ètò", notifications: "Àlàyé", recordPayment: "Tọ́pẹ́ Owo", familySavings: "Owo Àwọn Ará", helpRequests: "Àpẹ̀ẹ́rẹ̀ Iranlọwọ́", familyMembers: "Àwọn Ará Ilé" },
        auth: { yourName: "Oruko Re", password: "Ọ̀rọ̀ àgbá", signIn: "Wọ̀ Ó Ṣìnnì", createAccount: "Ṣẹ̀dà Àpò Ìfowópamọ́ Mi", fullName: "Oruko Pipe Re", fullNameHelper: "Fi oruko re sinu bi a ń mọ̀ yín", createPassword: "Ṣẹ̀dà Ọ̀rọ̀ Àgbá", createPasswordHelper: "Yan nkan ti o ko ranti", confirmPassword: "Ṣe àfihàn Ọ̀rọ̀ Àgbá", confirmPasswordHelper: "Tẹ ọ̀rọ̀ àgbá rẹ lẹẹkan si", managerPassword: "Ọ̀rọ̀ Àgbá Alakoso", signInAsManager: "Wọ̀ Ó Ṣìnnì Bi Alakoso", backToFamily: "Padà sí wọ̀ílì àwọn ará", alreadyHave: "Se o ni account?", noAccount: "Ko si account?", wrongCredentials: "Oruko tabi ọ̀rọ̀ àgbá kò tọ̀.", welcomeBack: "Ẹ káàbọ̀" },
        register: { howOften: "Bawo ni o ngbooro ṣe wà?", howMuch: "Elomirọ̀ ti o ngbooro ṣe?", howMuchHelper: "Iye owo ti o ngbooro ṣe laipari", whenStart: "Ngbẹ̀yin ti o ngbẹ̀?", whenStartHelper: "Oṣù ti o bẹ̀rẹ̀ ifowopamọ́", everyWeek: "Ọsẹ̀ Kọ̀ọ̀kan", everyMonth: "Oṣù Kọ̀ọ̀kan" },
        member: { greeting: { morning: "Ẹ káàárọ̀", afternoon: "Ẹ kásán", evening: "Ẹ kú irolẹ́", night: "Ódáàárọ̀" }, familySavings: "Owo Ifowopamọ́ Ará", personalSavings: "Owo Ti Mo", lastPayment: "Owo Ti O Kọ̀ Silẹ̀", alerts: "Àlàyé", upToDate: "O wa lori àkọ́sílẹ̀", behind: "O lọ̀wọ́ lori ifowopamọ́", recentPayments: "Owo Ti A Kọ̀ Silẹ̀ Tikari", requestHelp: "Beere Iranlọwọ́ Lati Ará", noPayments: "Ko si owo ti a kọ̀." },
        admin: { familyOverview: "Awọn Ará Ni Gbogbo", totalMembers: "Àwọn Ará", pendingRequests: "Àpẹ̀ẹ́rẹ̀ Iranlọwọ́ Ti Njẹ́", behindOnSavings: "Eyi Ti O Lọ̀wọ́", allUpToDate: "Gbogbo àwọn ará wa lori àkọ́sílẹ̀", shouldSave: "Yio gbọ̀dọ̀", hasSaved: "Ti kọ̀", gap: "Iye", quickActions: "Ise Laipẹ́", recordPayment: "Tọ́pẹ́ Owo", addMember: "Fi Ará Tuntun", reviewRequests: "Sọ̀rọ̀ Iranlọwọ́" },
        table: { date: "Ọjọ́", type: "Irú", amount: "Iye", reason: "Ìdí", proof: "Ẹ̀rí", member: "Ara", fund: "Ifowopamọ́", status: "Ipẹ̀", showAll: "Gbogbo", all: "Gbogbo", moneyIn: "Owo Wa", moneyOut: "Owo Lọ", totalIn: "Gbogbo Ti Wa", totalOut: "Gbogbo Ti Lọ", netBalance: "Iye Ti O Ku" },
        transaction: { recordPayment: "Tọ́pẹ́ Owo", whichMember: "Ta ni?", whichFund: "Ile yii?", whatType: "Irú owo?", howMuch: "Elomirọ̀?", whatFor: "Kini elomirọ̀?", whatForHelper: "e.g. Owo oṣù, Owo iorii", attachProof: "Fi ẹ̀rí owo", recordBtn: "Tọ́pẹ́ Owo", familyMoneyHistory: "Itan Owo Àwọn Ará" },
        careFund: { balance: "Iye Owo Iranlọwọ́", requestHelp: "Gba Owo Lati Ará", pastRequests: "Àwọn Ti O Ti Gba", noRequests: "O ko si gbasilẹ̀ owo rara", whatFor: "Kini elomirọ̀?", howMuchNeed: "Elomirọ̀ ni?", whenOccasion: "Ngba?", tellMore: "Sọ̀rọ̀ siwaju", optional: "le ṣe pataki", sendRequest: "Gba Owo", accepted: "A gba", pending: "Njẹ́", notApproved: "Ko gba" },
        members: { addMember: "Fi Ara Tuntun", fullName: "Oruko Pipe", password: "Ọ̀rọ̀ Àgbá", passwordHelper: "Wọn le yi pada lẹ́yà", howOften: "Bawo ni wọn ngbooro ṣe?", howMuchEach: "Elomirọ̀ ni?", startingFrom: "Ngbẹ̀yin ti?", resetPassword: "Yi Ọ̀rọ̀ Àgbá Pada" },
        settings: { myDetails: "Ìfitonilẹ́", changePassword: "Yi Ọ̀rọ̀ Àgbá Pada", currentPassword: "Ọ̀rọ̀ Àgbá Yi", newPassword: "Ọ̀rọ̀ Àgbá Tuntun", confirmNew: "Ṣe Àfihàn Ọ̀rọ̀ Àgbá Tuntun", language: "Ede", installApp: "Fi Ọ́ Tẹ̀lẹ̀", installPrompt: "Fi si oju opo wẹ́rẹ́ rẹ fún irapada", install: "Fi", iosInstructions: "Tẹ bọtini pin, lẹ́yin naa 'Fi si Oju Opo Wẹ́rẹ́'", dismiss: "Padà", contactManager: "Beere si alakoso lati yi ifowopamọ́ rẹ pada" },
        common: { save: "Fi", cancel: "Padà", loading: "N gba...", error: "Nkan kan lọ. Jọ̀wọ́ gbiyanju lẹẹkan si.", success: "Ti ṣẹ́lẹ̀!", markAllRead: "Ṣe gbogbo wọn ti a ka", allCaughtUp: "O ti pari", back: "Padà", viewReceipt: "Wo resi", justNow: "Nisisiyi", yesterday: "Ana", confirm: "Jọ̀wọ́", delete: "Paarẹ́", edit: "Yípùn", close: "Páde", search: "Wadi", noData: "Ko si data" },
        validation: { required: "A nilo elomirọ̀", passwordMismatch: "Ọ̀rọ̀ àgbá ko dọ́gba" },
        errors: {
            pageNotFound: "A ko rí iwe yii",
            pageNotFoundDesc: "A ko gbo iwe yii",
            userNotFound: "A ko rí orukọ yii",
            wrongPassword: "Ọ̀rọ̀ àgbá kò tọ̀. Jọ̀wọ́ gbiyanju lẹ́yìn.",
            notAdmin: "O ko si admin",
            useAdminLogin: "Lo admin login",
            networkError: "Ko si asopọ̀ internet. Jọ̀wọ́ ṣàyè sí nẹ́tìwọ̀ọ̀ki.",
            serverError: "Nkan kan lọ. Jọ̀wọ́ gbiyanju lẹ́yìn.",
            sessionExpired: "Session ti pari. Jọ̀wọ́ wọ̀ ó sí ìnà.",
            unauthorized: "Jọ̀wọ́ wọ̀ ó sí ìnà látiọ́",
            invalidRequest: "Alaye kò tọ̀. Jọ̀wọ́ ṣàyè sí àti gbiyanju.",
            insufficientFunds: "Owo ko to",
            transferFailed: "Transfer ti kọ̀silẹ̀. Jọ̀wọ́ gbiyanju lẹ́yìn.",
            uploadFailed: "Upload ti kọ̀silẹ̀. Jọ̀wọ́ gbiyanju lẹ́yìn.",
            tryAgain: "Nkan kan lọ. Jọ̀wọ́ gbiyanju lẹ́yìn."
        },
        occasions: { birthday: "Ọjọ́ Ibi", wedding: "Ìgbéyàwó", newBaby: "Omọ Titun", graduation: "Àwọn Ẹ̀kọ́", medical: "Ilori", other: "Ẹ̀yà" }
    },
    ig: {
        app: { name: "Odelade Family Ledger", tagline: "Nwube nke ezinụlọ gị, niile n'otu ebe" },
        nav: { home: "Họme", mySavings: "M nche", personalSavings: "Nke M", myHistory: "Akụkọ M", settings: "Nhazi", notifications: "Mkpọtụ", recordPayment: "Dekọọ Ọgwụ", familySavings: "Ezinụlọ Nche", helpRequests: "Arịrịọ Nkwado", familyMembers: "Ụmụ Ezinụlọ" },
        auth: { yourName: "Aha Gị", password: "Paswọọdụ", signIn: "Banye", createAccount: "Mepụta Akpa M", fullName: "Aha Gị Niile", fullNameHelper: "Tinye aha gị ka ezinụlọ mụrụ gị", createPassword: "Mepụta Paswọọdụ", createPasswordHelper: "Họrọ ihe ị ga-echeta", confirmPassword: "Chọpụta Paswọọdụ", confirmPasswordHelper: "Pịnye paswọọdụ gị ọzọ", managerPassword: "Paswọọdụ Onye Nchịkwa", signInAsManager: "Banye Dịka Onye Nchịkwa", backToFamily: "Laghachi na nlogi ezinụlọ", alreadyHave: "Ị nwere akaụntụ?", noAccount: "Ịnweghi akaụntụ?", wrongCredentials: "Aha ma ọ bụ paswọọdụ ezighị ezi.", welcomeBack: "Nnoo" },
        register: { howOften: "Olee ugboro ị na-echekwa?", howMuch: "Kedu ego ị na-echekwa ozo?", howMuchHelper: "Ego ị na-echekwa kwa oge", whenStart: "Gịnị ka ị malitere?", whenStartHelper: "Ọnwa ị malitere ịchekwa", everyWeek: "Kwaizu", everyMonth: "Kwa onwa" },
        member: { greeting: { morning: "Ụtụtụ ọma", afternoon: "Ehihie ọma", evening: "Mgbede ọma", night: "Anyasị ọma" }, familySavings: "Nchekwa Ezinụlọ", personalSavings: "Nke M", lastPayment: "Ọgwụ Ikpeazụ", alerts: "Mkpọtụ", upToDate: "Ị dị njikere", behind: "Ị nweghị ihe ịchọrọ", recentPayments: "Ọgwụ Ọhụrụ", requestHelp: "Chọọ Nkwado Ezinụlọ", noPayments: "Enweghị ọgwụ ọma." },
        admin: { familyOverview: "Nhọpụta Ezinụlọ", totalMembers: "Ụmụ Ezinụlọ", pendingRequests: "Arịrịọ Nkwado", behindOnSavings: "Ndị Nwere Nhị Ọgwụ", allUpToDate: "Ndị ezinụlọ niile dị njikere", shouldSave: "Ha ga-echekwa", hasSaved: "Ha echeela", gap: "Ọdịda", quickActions: "Omume Ozor", recordPayment: "Dekọọ Ọgwụ", addMember: "Tinye Onye", reviewRequests: "Lelee Arịrịọ" },
        table: { date: "Ụbọchị", type: "Ụdị", amount: "Ego", reason: "Okwu", proof: "Ihe Nkwado", member: "Onye", fund: "Nchekwa", status: "Ụdị", showAll: "Niile", all: "Niile", moneyIn: "Mere Ego", moneyOut: "Mere Ego", totalIn: "Ngụkọta Ego", totalOut: "Ngụkọta Ego", netBalance: "Mkpọ" },
        transaction: { recordPayment: "Dekọọ Ọgwụ", whichMember: "Onye ole?", whichFund: "Kedu nchekwa?", whatType: "Kedu ụdị?", howMuch: "Kedu ego?", whatFor: "Gịnị ka ọ bụ?", whatForHelper: "e.g. Ọgwụ kwa onwa, Ọgwụ ahụike", attachProof: "Tinye akaụntụ", recordBtn: "Dekọọ Ọgwụ", familyMoneyHistory: "Akụkọ Ego Ezinụlọ" },
        careFund: { balance: "Nchekwa Nkwado", requestHelp: "Nweta Ego Ezinụlọ", pastRequests: "Nwere Ole", noRequests: "Ịchọtaghị ego ọma", whatFor: "Gịnị ka ọ bụ?", howMuchNeed: "Kedu ego ịchọrọ?", whenOccasion: "Mgbe?", tellMore: "Kọwaa ozo", optional: "ọ na-achọpụta", sendRequest: "Nweta Ego", accepted: "Akwadoro", pending: "Na-echere", notApproved: "Ọ dịghị" },
        members: { addMember: "Tinye Onye", fullName: "Aha Niile", password: "Paswọọdụ", passwordHelper: "Ha nwere ike ịgbanwe ya", howOften: "Olee ugboro ha na-echekwa?", howMuchEach: "Kedu ego?", startingFrom: "Mmalite?", resetPassword: "Megharịa Paswọọdụ" },
        settings: { myDetails: "M banyere", changePassword: "Gbanwe Paswọọdụ", currentPassword: "Paswọọdụ Ugbu a", newPassword: "Paswọọdụ Ọhụrụ", confirmNew: "Chọpụta Paswọọdụ Ọhụrụ", language: "Asụsụ", installApp: "Wụnye App", installPrompt: "Tinye na bọtịn maka ngwa ngwa", install: "Wụnye", iosInstructions: "Tugharịa bọtịn, mgbe ahụ 'Tinye na Bọtịn'", dismiss: "Kpachapụ", contactManager: "Kpọtụ onye nchịkwa ka ị gbanwe nhọrọ gị" },
        common: { save: "Chekwa", cancel: "Kwụsị", loading: "Na-ebu ụzọ...", error: "Ihe ụfọdụ gbaghara. Biko nwaa ọzọ.", success: "Ọmụmaatụ!", markAllRead: "Dee niile", allCaughtUp: "Ị dị njikere", back: "Laghachi", viewReceipt: "Lelee akaụntụ", justNow: "Ugbu a", yesterday: "Ndịnaa", confirm: "Nhọrọ", delete: "Hụpụ", edit: "Dezie", close: "Mechie", search: "Chọọ", noData: "Enweghị data" },
        validation: { required: "A chọrọ ihe", passwordMismatch: "Paswọọdụ adịghị" },
        errors: {
            pageNotFound: "Peję apụta",
            pageNotFoundDesc: "Peję apụta nke a",
            userNotFound: "Anyị amaghị aha a",
            wrongPassword: "Paswọọdụ ezighị ezi. Biko nwaa ọzọ.",
            notAdmin: "Ị abụghị admin",
            useAdminLogin: "Jiri admin login",
            networkError: "Enweghị netwọk. Biko leba anya na netwọk gị.",
            serverError: "Ihe ụfọdụ gbaghara. Biko nwaa ọzọ.",
            sessionExpired: "Oge agwụla. Biko banye ọzọ.",
            unauthorized: "Biko banye",
            invalidRequest: "Info ezighị ezi. Biko nwaa ọzọ.",
            insufficientFunds: "Ego adịghị",
            transferFailed: "Mgbanwe agwụla. Biko nwaa ọzọ.",
            uploadFailed: "Nugbu awo agwụla. Biko nwaa ọzọ.",
            tryAgain: "Ihe ụfọdụ gbaghara. Biko nwaa ọzọ."
        },
        occasions: { birthday: "Mkpụrụ Obodo", wedding: "Igodo Ụlọ", newBaby: "Nwa Nzoputa", graduation: "Mmemme", medical: "Ahụike", other: "Ihe ndị ọzọ" }
    },
    ha: {
        app: { name: "Odelade Family Ledger", tagline: "Adadin kudi dangi, a cikin wuri guda" },
        nav: { home: "Gida", mySavings: "Kudina", personalSavings: "Na Ub", myHistory: "Tarihi", settings: "Saiti", notifications: "Sanarwa", recordPayment: "Rikodi Biyan", familySavings: "Kudin Dangi", helpRequests: "Buƙatar Taimako", familyMembers: "Yan Uwa" },
        auth: { yourName: "Sunan Ka", password: "Kalmar Sirri", signIn: "Shiga", createAccount: "Ƙirƙiri Asusu Na", fullName: "Cikakken Sunan Ka", fullNameHelper: "Shigar da sunan ka kamar yadda dangin ya sani", createPassword: "Ƙirƙiri Kalmar Sirri", createPasswordHelper: "Zabi abin da za ka tuna", confirmPassword: "Tabbatar da Kalmar Sirri", confirmPasswordHelper: "Shigar da kalmar sirri kuma", managerPassword: "Kalmar Sirri ta Manaja", signInAsManager: "Shiga a matsayin Manaja", backToFamily: "Koma shigar dangin", alreadyHave: "Kana da asusu?", noAccount: "Ba ka da asusu?", wrongCredentials: "Sunan ko kalmar sirri ba daidai ba.", welcomeBack: "Maraba" },
        register: { howOften: "yanayin ajiyar ku?", howMuch: "kudin da kuke ajiye kowane lokaci?", howMuchHelper: "adadin da kuke shirin ajiye akai-akai", whenStart: "Lokacin fara?", whenStartHelper: "wata da kuke fara ajiyar", everyWeek: "Kowane Mako", everyMonth: "Kowane Wata" },
        member: { greeting: { morning: "Sannu da safe", afternoon: "Sannu da rana", evening: "Sannu da yamma", night: "Sannu da dare" }, familySavings: "Kudin Dangi", personalSavings: "Na Ub", lastPayment: "Bayanin Karshe", alerts: "Sanarwa", upToDate: "Kuna nan", behind: "Kuna azaba", recentPayments: "Bayanin Kwanaki", requestHelp: "Buƙatar Taimako", noPayments: "Babu bayanin da aka rubuta." },
        admin: { familyOverview: "Gani na Dangi", totalMembers: "Yan Uwa", pendingRequests: "Buƙatar Taimako", behindOnSavings: "Waɗanda ba su biya ba", allUpToDate: "Dukan yan uwa sun biya", shouldSave: "Ya kamata", hasSaved: "Sun biya", gap: "Ragowar", quickActions: "Aikin Yau", recordPayment: "Rikodi Biyan", addMember: "Ƙara Baya", reviewRequests: "Gani Buƙata" },
        table: { date: "Ranar", type: "Nau'i", amount: "Adadin", reason: "Dalili", proof: "Hujja", member: "Mutum", fund: "Kudi", status: "Yanayi", showAll: "Duka", all: "Duka", moneyIn: "Shigarwa", moneyOut: "Fitarwa", totalIn: "Jimlar Shigarwa", totalOut: "Jimlar Fitarwa", netBalance: "Ragowar" },
        transaction: { recordPayment: "Rikodi Biyan", whichMember: "Wane ne?", whichFund: "Wace kundi?", whatType: "Wane nau'i?", howMuch: "Nawa?", whatFor: "Dalili?", whatForHelper: "e.g. kudin wata, kudin likita", attachProof: "Shigar da hujja", recordBtn: "Rikodi Biyan", familyMoneyHistory: "Tarihin Kudin Dangi" },
        careFund: { balance: "Adadin Taimako", requestHelp: "Gabatar da Buƙata", pastRequests: "Buƙatun Da Wuce", noRequests: "Ba ku yi buƙatar taimako ba", whatFor: "Menene dalili?", howMuchNeed: "Nawa kuke buƙata?", whenOccasion: "Lokaci?", tellMore: "Ka bayyana", optional: "ba dole ba ne", sendRequest: "Gabatar da Buƙata", accepted: "An amince", pending: "A makale", notApproved: "Ba a amince ba" },
        members: { addMember: "Ƙara Baya", fullName: "Cikakken Suna", password: "Kalmar Sirri", passwordHelper: "Za su iya canza daga baya", howOften: "yanayin ajiyar su?", howMuchEach: "nawa kowane lokaci?", startingFrom: "fara daga?", resetPassword: "Sake Kalmar Sirri" },
        settings: { myDetails: "Bayanina", changePassword: "Canza Kalmar Sirri", currentPassword: "Kalmar Sirri ta Yanzu", newPassword: "Sabuwar Kalmar Sirri", confirmNew: "Tabbatar da sabuwar kalmar sirri", language: "Harshe", installApp: "Shigar da App", installPrompt: "Ƙara zuwa gidan yanar gizo don samun damar", install: "Shigar", iosInstructions: "Danna maɓallin raba, sannan 'Ƙara zuwa Gidan Yanar Gizo'", dismiss: "A gujewa", contactManager: "Tuntuɓi manajan don canza tsarin ajiyar ku" },
        common: { save: "Ajiye", cancel: "Soke", loading: "Ana loda...", error: "Wasu abubuwa sun tafiya ba daidai ba.", success: "Nasara!", markAllRead: "Gane duk", allCaughtUp: "Kun yi nasara", back: "Koma", viewReceipt: "Dubi rusull", justNow: "Yanzu", yesterday: "Shekara", confirm: "Tabbatar", delete: "Goge", edit: "Shirya", close: "Rufe", search: "Nema", noData: "Babu data" },
        validation: { required: "Wannan filin ana bukatarsa", passwordMismatch: "Kalmomin sirri ba daidai ba" },
        errors: {
            pageNotFound: "Shafi Ba Samu",
            pageNotFoundDesc: "Shafin da kuke nema ba samo ba",
            userNotFound: "Ba mu gane sunan nan",
            wrongPassword: "Kalmar sirri ba daidai ba. A sake gwadawa.",
            notAdmin: "Ba kai admin ba",
            useAdminLogin: "Yi amfani da admin login",
            networkError: "Babbar sadarwa ba aiki. Duba sadarwar ka.",
            serverError: "Wasu abubuwa sun tafiya ba daidai ba. A sake gwadawa.",
            sessionExpired: "Lokacin kaɗaici. Shiga sabuwa.",
            unauthorized: "Shiga don ci gaba",
            invalidRequest: "Bayananai ba masu amsawa ba. A sake gwadawa.",
            insufficientFunds: "Kudin bai isa ba",
            transferFailed: "Canjar guda. A sake gwadawa.",
            uploadFailed: "Aikawa ta guda. A sake gwadawa.",
            tryAgain: "Wasu abubuwa sun tafiya ba daidai ba. A sake gwadawa."
        },
        occasions: { birthday: "Ranar Haihuwa", wedding: "Aure", newBaby: "Haifuwa", graduation: "Kammalawa", medical: "Lafiya", other: "Wani" }
    },
    ar: {
        app: { name: "سجل عائلة أوديلاد", tagline: "مدخرات عائلتك، كلها في مكان واحد" },
        nav: {
            home: "الرئيسية", mySavings: "مدخراتي", personalSavings: "ادخاري الشخصي",
            myHistory: "سجل معاملاتي", settings: "الإعدادات", notifications: "التنبيهات",
            recordPayment: "تسجيل دفعة", familySavings: "مدخرات العائلة",
            helpRequests: "طلبات المساعدة", familyMembers: "أفراد العائلة"
        },
        auth: {
            yourName: "اسمك", yourNamePlaceholder: "مثال: تايو أوديلاد",
            password: "كلمة المرور", signIn: "تسجيل الدخول", createAccount: "إنشاء حسابي",
            fullName: "اسمك الكامل", fullNameHelper: "أدخل اسمك كما تعرفه العائلة",
            createPassword: "إنشاء كلمة مرور", createPasswordHelper: "اختر شيئاً ستتذكره",
            confirmPassword: "تأكيد كلمة المرور", confirmPasswordHelper: "أعد كتابة كلمة المرور",
            managerPassword: "كلمة مرور المدير", signInAsManager: "تسجيل الدخول كمدير",
            backToFamily: "العودة لتسجيل دخول العائلة",
            alreadyHave: "لديك حساب بالفعل؟", noAccount: "ليس لديك حساب؟",
            wrongCredentials: "الاسم أو كلمة المرور غير صحيحة. حاول مرة أخرى.",
            welcomeBack: "مرحباً بعودتك"
        },
        register: {
            howOften: "كم مرة ستوفر المال؟", howMuch: "كم ستوفر في كل مرة؟",
            howMuchHelper: "المبلغ الذي تنوي توفيره بانتظام",
            whenStart: "متى ستبدأ؟", whenStartHelper: "الشهر الذي تبدأ فيه الادخار",
            everyWeek: "كل أسبوع", everyMonth: "كل شهر"
        },
        member: {
            greeting: { 
                morning: "صباح الخير", 
                afternoon: "مساء الخير", 
                evening: "مساء النور",
                night: "تصبح على خير"
            },
            familySavings: "مدخرات العائلة", personalSavings: "ادخاري الشخصي",
            lastPayment: "آخر دفعة", alerts: "التنبيهات",
            upToDate: "أنت محدث ✓", behind: "أنت متأخر في الادخار",
            recentPayments: "المدفوعات الأخيرة", requestHelp: "طلب المساعدة العائلية",
            noPayments: "لا توجد مدفوعات مسجلة بعد. مدير عائلتك سيسجل أول دفعة لك."
        },
        admin: {
            familyOverview: "نظرة عامة على العائلة", totalMembers: "أفراد العائلة",
            pendingRequests: "طلبات المساعدة المعلقة", behindOnSavings: "متأخرين في الادخار",
            allUpToDate: "جميع أفراد العائلة محدثون ✓",
            shouldSave: "ينبغي أن يوفر", hasSaved: "لقد وفر", gap: "الفجوة",
            quickActions: "إجراءات سريعة", recordPayment: "تسجيل دفعة",
            addMember: "إضافة فرد للعائلة", reviewRequests: "مراجعة طلبات المساعدة"
        },
        table: {
            date: "التاريخ", type: "النوع", amount: "المبلغ", reason: "السبب",
            proof: "إثبات", member: "الفرد", fund: "الصندوق", status: "الحالة",
            showAll: "إظهار الكل", all: "الكل", moneyIn: "دخل مالي", moneyOut: "خروج مالي",
            totalIn: "إجمالي الدخل", totalOut: "إجمالي الخرج", netBalance: "الرصيد الصافي"
        },
        transaction: {
            recordPayment: "تسجيل دفعة", whichMember: "أي فرد؟", whichFund: "أي صندوق؟",
            whatType: "أي نوع؟", howMuch: "كم المبلغ؟", whatFor: "ما السبب؟",
            whatForHelper: "مثال: مساهمة شهرية، فاتورة طبية", attachProof: "إرفاق إثبات الدفع",
            recordBtn: "تسجيل الدفعة", familyMoneyHistory: "سجل أموال العائلة"
        },
        careFund: {
            balance: "رصيد ادخار الشخصي", requestHelp: "سحب من المدخرات",
            pastRequests: "السحوبات السابقة", noRequests: "لم تسحب أي مبلغ بعد",
            whatFor: "ما السبب؟", howMuchNeed: "كم تحتاج؟", whenOccasion: "متى؟",
            tellMore: "أخبرنا المزيد", optional: "اختياري", sendRequest: "طلب السحب",
            accepted: "موافق ✓", pending: "قيد الانتظار ⏳", notApproved: "مرفوض ✗"
        },
        members: {
            addMember: "إضافة فرد", fullName: "الاسم الكامل", password: "كلمة المرور",
            passwordHelper: "يمكنهم تغييرها لاحقاً", howOften: "كم مرة سيوفر؟", howMuchEach: "كم في كل مرة؟",
            startingFrom: "يبدأ من؟", resetPassword: "إعادة تعيين كلمة المرور"
        },
        settings: {
            myDetails: "تفاصيلي", changePassword: "تغيير كلمة المرور", currentPassword: "كلمة المرور الحالية",
            newPassword: "كلمة المرور الجديدة", confirmNew: "تأكيد كلمة المرور الجديدة", language: "اللغة",
            installApp: "تثبيت التطبيق", installPrompt: "أ对其真实 للشاشة الرئيسية للوصول الأسرع",
            install: "تثبيت", iosInstructions: "اضغط زر المشاركة، ثم 'أ对其真实 إلى الشاشة الرئيسية'",
            dismiss: "تجاهل", contactManager: "اتصل بمدير العائلة لتغيير جدول ادخارك"
        },
        common: {
            save: "حفظ", cancel: "إلغاء", loading: "جاري التحميل...",
            error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.", success: "تم بنجاح!",
            markAllRead: "تعليم الكل كمقروء", allCaughtUp: "لقد قرأت كل شيء ✓",
            back: "رجوع", viewReceipt: "عرض الإيصال", justNow: "الآن",
            yesterday: "أمس", confirm: "تأكيد", delete: "حذف", edit: "تعديل", close: "إغلاق",
            search: "بحث", noData: "لا توجد بيانات", upToDate: "محدث ✓", new: "جديد", earlier: "سابقاً",
            noNewNotifications: "لا توجد تنبيهات جديدة", alertsCaughtUp: "لقد قرأت كل التنبيهات!",
            alertsCatchUpDesc: "عندما تكون لديك تنبيهات جديدة، ستظهر هنا. ابق على تواصل!",
            thisMonthSavings: "ادخار هذا الشهر", membersContributing: "من أفراد العائلة يساهمون",
            familyManager: "مدير العائلة", familyManagerAccess: "وصول مدير العائلة", newMember: "عضو جديد",
            manageAccount: "إدارة حسابك", membersContributing: "أفراد يساهمون"
        },
        validation: { required: "هذا الحقل مطلوب", passwordMismatch: "كلمات المرور غير متطابقة" },
        errors: {
            pageNotFound: "الصفحة غير موجودة", pageNotFoundDesc: "الصفحة التي تبحث عنها غير موجودة.",
            userNotFound: "المستخدم غير موجود", wrongPassword: "كلمة المرور خاطئة",
            notAdmin: "أنت لست مديراً", useAdminLogin: "استخدم تسجيل دخول المدير"
        },
        occasions: { birthday: "عيد ميلاد", wedding: "زفاف", newBaby: "مولود جديد", graduation: "تخرج", medical: "طبي", other: "آخر" }
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

// RTL languages
const rtlLangs = ['ar'];

function isRTL() {
    return rtlLangs.includes(currentLang);
}

function updateDirection() {
    if (isRTL()) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

// Initialize direction on load
updateDirection();

function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    
    // Try current language first
    for (const k of keys) {
        if (value && typeof value === 'object' && value[k] !== undefined) {
            value = value[k];
        } else {
            value = undefined;
            break;
        }
    }
    
    // Fallback to English if not found or not a string
    if (value === undefined || typeof value !== 'string') {
        value = translations.en;
        for (const k of keys) {
            if (value && typeof value === 'object' && value[k] !== undefined) {
                value = value[k];
            } else {
                return key; // Return key if not found in English either
            }
        }
    }
    
    return typeof value === 'string' ? value : key;
}

function setLang(lang) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('lang', lang);
    updateDirection();
    closeLangModal();
    // Re-render current page to apply new language
    if (typeof router !== 'undefined' && router.navigate) {
        router.navigate(window.location.pathname);
    } else {
        window.location.reload();
    }
}

function getCurrentLang() {
    return currentLang;
}

function openLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) modal.classList.remove('hidden');
    updateLangButtons();
}

function closeLangModal() {
    const modal = document.getElementById('lang-modal');
    if (modal) modal.classList.add('hidden');
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (!btn) return;
        const check = btn.querySelector('.check');
        if (btn.dataset.lang === currentLang) {
            if (check) check.classList.remove('hidden');
            btn.classList.add('bg-brand-light', 'text-brand', 'border-brand');
            btn.classList.remove('border-transparent');
        } else {
            if (check) check.classList.add('hidden');
            btn.classList.remove('bg-brand-light', 'text-brand', 'border-brand');
            btn.classList.add('border-transparent');
        }
    });
}

// Get language display name
function getLangName(lang) {
    const names = {
        en: 'English',
        yo: 'Yoruba',
        ig: 'Igbo',
        ha: 'Hausa',
        ar: 'Arabic'
    };
    return names[lang] || lang;
}

// Get current language name for display
function getCurrentLangName() {
    return getLangName(currentLang);
}

// Initialize language on load
(function initLang() {
    const saved = localStorage.getItem('lang');
    if (saved && translations[saved]) {
        currentLang = saved;
    }
    updateDirection();
})();
