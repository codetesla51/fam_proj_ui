// i18n - Translations
const translations = {
    en: {
        app: { name: "Odelade Family Ledger", tagline: "Your family savings, all in one place" },
        nav: {
            home: "Home", mySavings: "My Savings", careFund: "Care Fund",
            myHistory: "My History", settings: "Settings", notifications: "Alerts",
            recordPayment: "Record Payment", familySavings: "Family Savings",
            helpRequests: "Help Requests", familyMembers: "Family Members"
        },
        auth: {
            yourName: "Your Name", yourNamePlaceholder: "e.g. Taiwo Odelade",
            password: "Password", signIn: "Sign In", createAccount: "Create My Account",
            fullName: "Your Full Name", fullNameHelper: "Enter your name as the family knows you",
            createPassword: "Create a Password", createPasswordHelper: "Choose something you will remember",
            confirmPassword: "Confirm Password", confirmPasswordHelper: "Type your password again",
            managerPassword: "Manager Password", signInAsManager: "Sign In as Manager",
            backToFamily: "← Back to family login",
            alreadyHave: "Already have an account?", noAccount: "Don't have an account?",
            wrongCredentials: "Wrong name or password. Please try again."
        },
        register: {
            howOften: "How often will you save?", howMuch: "How much will you save each time?",
            howMuchHelper: "The amount you plan to save regularly",
            whenStart: "When are you starting?", whenStartHelper: "The month you begin saving",
            everyWeek: "Every Week", everyMonth: "Every Month"
        },
        member: {
            greeting: { morning: "Good morning", afternoon: "Good afternoon", evening: "Good evening" },
            familySavings: "Family Savings", careFund: "Care Fund",
            lastPayment: "Last Payment", alerts: "Alerts",
            upToDate: "You are up to date ✓", behind: "You are behind on savings",
            recentPayments: "Recent Payments", requestHelp: "Request Family Help",
            noPayments: "No payments recorded yet. Your family manager will record your first payment."
        },
        admin: {
            familyOverview: "Family Overview", totalMembers: "Family Members",
            pendingRequests: "Pending Help Requests", behindOnSavings: "Behind on Savings",
            allUpToDate: "All family members are up to date ✓",
            shouldSave: "Should Save", hasSaved: "Has Saved", gap: "Gap",
            quickActions: "Quick Actions", recordPayment: "Record a Payment",
            addMember: "Add Family Member", reviewRequests: "Review Help Requests"
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
            balance: "Care Fund Balance", requestHelp: "Request Family Help",
            pastRequests: "Past Requests", noRequests: "You have not made any requests yet",
            whatFor: "What is this for?", howMuchNeed: "How much do you need?",
            whenOccasion: "When is the occasion?", tellMore: "Tell us more",
            optional: "optional", sendRequest: "Send Request",
            accepted: "Accepted ✓", pending: "Pending ⏳", notApproved: "Not Approved ✗"
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
            dismiss: "Dismiss", contactManager: "Contact the family manager to change your savings schedule"
        },
        common: {
            save: "Save", cancel: "Cancel", loading: "Loading...",
            error: "Something went wrong. Please try again.", success: "Success!",
            markAllRead: "Mark all as read", allCaughtUp: "You are all caught up ✓",
            back: "Back", viewReceipt: "View receipt", justNow: "Just now",
            yesterday: "Yesterday", confirm: "Confirm", delete: "Delete",
            edit: "Edit", close: "Close", search: "Search", noData: "No data",
            upToDate: "Up to date ✓", new: "New", earlier: "Earlier",
            noNewNotifications: "No new notifications",
            alertsCaughtUp: "You're all caught up!",
            alertsCatchUpDesc: "When you have new alerts, they'll show up here. Stay tuned!",
            thisMonthSavings: "This month's savings",
            membersContributing: "family members contributing",
            familyManager: "Family Manager",
            familyManagerAccess: "Family Manager Access",
            newMember: "New Member",
            manageAccount: "Manage your account"
        },
        validation: { required: "This field is required", passwordMismatch: "Passwords do not match" },
        errors: {
            pageNotFound: "Page Not Found",
            pageNotFoundDesc: "The page you're looking for doesn't exist.",
            userNotFound: "User not found",
            wrongPassword: "Wrong password",
            notAdmin: "You are not an admin",
            useAdminLogin: "Please use admin login"
        },
        occasions: {
            birthday: "Birthday", wedding: "Wedding", newBaby: "New Baby",
            graduation: "Graduation", medical: "Medical", other: "Other"
        }
    },
    yo: {
        app: { name: "Odelade Family Ledger", tagline: "Owo igbasilẹ̀ ìdàgbàsókè" },
        nav: { home: "Àkọ́kọ́", mySavings: "Owo Ti Mo Fi Pamọ́", careFund: "Owo Iranlọwọ́", myHistory: "Itan Owo Mi", settings: "Ètò", notifications: "Àlàyé", recordPayment: "Tọ́pẹ́ Owo", familySavings: "Owo Àwọn Ará", helpRequests: "Àpẹ̀ẹ́rẹ̀ Iranlọwọ́", familyMembers: "Àwọn Ará Ilé" },
        auth: { yourName: "Oruko Re", password: "Ọ̀rọ̀ àgbá", signIn: "Wọ̀ Ó Ṣìnnì", createAccount: "Ṣẹ̀dà Àpò Ìfowópamọ́ Mi", fullName: "Oruko Pipe Re", fullNameHelper: "Fi oruko re sinu bi a ń mọ̀ yín", createPassword: "Ṣẹ̀dà Ọ̀rọ̀ Àgbá", createPasswordHelper: "Yan nkan ti o ko ranti", confirmPassword: "Ṣe àfihàn Ọ̀rọ̀ Àgbá", confirmPasswordHelper: "Tẹ ọ̀rọ̀ àgbá rẹ lẹẹkan si", managerPassword: "Ọ̀rọ̀ Àgbá Alakoso", signInAsManager: "Wọ̀ Ó Ṣìnnì Bi Alakoso", backToFamily: "← Padà sí wọ̀ílì àwọn ará", alreadyHave: "Se o ni account?", noAccount: "Ko si account?", wrongCredentials: "Oruko tabi ọ̀rọ̀ àgbá kò tọ̀." },
        register: { howOften: "Bawo ni o ngbooro ṣe wà?", howMuch: "Elomirọ̀ ti o ngbooro ṣe?", howMuchHelper: "Iye owo ti o ngbooro ṣe laipari", whenStart: "Ngbẹ̀yin ti o ngbẹ̀?", whenStartHelper: "Oṣù ti o bẹ̀rẹ̀ ifowopamọ́", everyWeek: "Ọsẹ̀ Kọ̀ọ̀kan", everyMonth: "Oṣù Kọ̀ọ̀kan" },
        member: { greeting: { morning: "Ẹ káàárọ̀", afternoon: "Ẹ káàárọ̀", evening: "Ẹ káàárọ̀" }, familySavings: "Owo Ifowopamọ́ Ará", careFund: "Owo Iranlọwọ́", lastPayment: "Owo Ti O Kọ̀ Silẹ̀", alerts: "Àlàyé", upToDate: "O wa lori àkọ́sílẹ̀ ✓", behind: "O lọ̀wọ́ lori ifowopamọ́", recentPayments: "Owo Ti A Kọ̀ Silẹ̀ Tikari", requestHelp: "Beere Iranlọwọ́ Lati Ará", noPayments: "Ko si owo ti a kọ̀." },
        admin: { familyOverview: "Awọn Ará Ni Gbogbo", totalMembers: "Àwọn Ará", pendingRequests: "Àpẹ̀ẹ́rẹ̀ Iranlọwọ́ Ti Njẹ́", behindOnSavings: "Eyi Ti O Lọ̀wọ́", allUpToDate: "Gbogbo àwọn ará wa lori àkọ́sílẹ̀ ✓", shouldSave: "Yio gbọ̀dọ̀", hasSaved: "Ti kọ̀", gap: "Iye", quickActions: "Ise Laipẹ́", recordPayment: "Tọ́pẹ́ Owo", addMember: "Fi Ará Tuntun", reviewRequests: "Sọ̀rọ̀ Iranlọwọ́" },
        table: { date: "Ọjọ́", type: "Irú", amount: "Iye", reason: "Ìdí", proof: "Ẹ̀rí", member: "Ara", fund: "Ifowopamọ́", status: "Ipẹ̀", showAll: "Gbogbo", all: "Gbogbo", moneyIn: "Owo Wa", moneyOut: "Owo Lọ", totalIn: "Gbogbo Ti Wa", totalOut: "Gbogbo Ti Lọ", netBalance: "Iye Ti O Ku" },
        transaction: { recordPayment: "Tọ́pẹ́ Owo", whichMember: "Ta ni?", whichFund: "Ile yii?", whatType: "Irú owo?", howMuch: "Elomirọ̀?", whatFor: "Kini elomirọ̀?", whatForHelper: "e.g. Owo oṣù, Owo iorii", attachProof: "Fi ẹ̀rí owo", recordBtn: "Tọ́pẹ́ Owo", familyMoneyHistory: "Itan Owo Àwọn Ará" },
        careFund: { balance: "Iye Owo Iranlọwọ́", requestHelp: "Beere Iranlọwọ́ Lati Ará", pastRequests: "Àpẹ̀ẹ́rẹ̀ Ti O Ti Kọ̀", noRequests: "O ko si bere iranlọwọ́ rara", whatFor: "Kini elomirọ̀?", howMuchNeed: "Elomirọ̀ ni?", whenOccasion: "Ngba?", tellMore: "Sọ̀rọ̀ siwaju", optional: "le ṣe pataki", sendRequest: "Fún ìpè", accepted: "A gba", pending: "Njẹ́", notApproved: "Ko gba" },
        members: { addMember: "Fi Ara Tuntun", fullName: "Oruko Pipe", password: "Ọ̀rọ̀ Àgbá", passwordHelper: "Wọn le yi pada lẹ́yà", howOften: "Bawo ni wọn ngbooro ṣe?", howMuchEach: "Elomirọ̀ ni?", startingFrom: "Ngbẹ̀yin ti?", resetPassword: "Yi Ọ̀rọ̀ Àgbá Pada" },
        settings: { myDetails: "Ìfitonilẹ́", changePassword: "Yi Ọ̀rọ̀ Àgbá Pada", currentPassword: "Ọ̀rọ̀ Àgbá Yi", newPassword: "Ọ̀rọ̀ Àgbá Tuntun", confirmNew: "Ṣe Àfihàn Ọ̀rọ̀ Àgbá Tuntun", language: "Ede", installApp: "Fi Ọ́ Tẹ̀lẹ̀", installPrompt: "Fi si oju opo wẹ́rẹ́ rẹ fún irapada", install: "Fi", iosInstructions: "Tẹ bọtini pin, lẹ́yin naa 'Fi si Oju Opo Wẹ́rẹ́'", dismiss: "Padà", contactManager: "Beere si alakoso lati yi ifowopamọ́ rẹ pada" },
        common: { save: "Fi", cancel: "Padà", loading: "N gba...", error: "Nkan kan lọ. Jọ̀wọ́ gbiyanju lẹẹkan si.", success: "Ti ṣẹ́lẹ̀!", markAllRead: "Ṣe gbogbo wọn ti a ka", allCaughtUp: "O ti pari", back: "Padà", viewReceipt: "Wo resi", justNow: "Nisisiyi", yesterday: "Ana", confirm: "Jọ̀wọ́", delete: "Paarẹ́", edit: "Yípùn", close: "Páde", search: "Wadi", noData: "Ko si data" },
        validation: { required: "A nilo elomirọ̀", passwordMismatch: "Ọ̀rọ̀ àgbá ko dọ́gba" },
        errors: {
            pageNotFound: "A ko rí iwe yii",
            pageNotFoundDesc: "A ko gbo iwe yii",
            userNotFound: "A ko rí olumọ́",
            wrongPassword: "Ọ̀rọ̀ àgbá kò tọ̀",
            notAdmin: "O ko si admin",
            useAdminLogin: "Lo admin login"
        },
        occasions: { birthday: "Ọjọ́ Ibi", wedding: "Ìgbéyàwó", newBaby: "Omọ Titun", graduation: "Àwọn Ẹ̀kọ́", medical: "Ilori", other: "Ẹ̀yà" }
    },
    ig: {
        app: { name: "Odelade Family Ledger", tagline: "Nwube nke ezinụlọ gị, niile n'otu ebe" },
        nav: { home: "Họme", mySavings: "M nche", careFund: "Nkwado", myHistory: "Akụkọ M", settings: "Nhazi", notifications: "Mkpọtụ", recordPayment: "Dekọọ Ọgwụ", familySavings: "Ezinụlọ Nche", helpRequests: "Arịrịọ Nkwado", familyMembers: "Ụmụ Ezinụlọ" },
        auth: { yourName: "Aha Gị", password: "Paswọọdụ", signIn: "Banye", createAccount: "Mepụta Akpa M", fullName: "Aha Gị Niile", fullNameHelper: "Tinye aha gị ka ezinụlọ mụrụ gị", createPassword: "Mepụta Paswọọdụ", createPasswordHelper: "Họrọ ihe ị ga-echeta", confirmPassword: "Chọpụta Paswọọdụ", confirmPasswordHelper: "Pịnye paswọọdụ gị ọzọ", managerPassword: "Paswọọdụ Onye Nchịkwa", signInAsManager: "Banye Dịka Onye Nchịkwa", backToFamily: "← Laghachi na nlogi ezinụlọ", alreadyHave: "Ị nwere akaụntụ?", noAccount: "Ịnweghi akaụntụ?", wrongCredentials: "Aha ma ọ bụ paswọọdụ ezighị ezi." },
        register: { howOften: "Olee ugboro ị na-echekwa?", howMuch: "Kedu ego ị na-echekwa ozo?", howMuchHelper: "Ego ị na-echekwa kwa oge", whenStart: "Gịnị ka ị malitere?", whenStartHelper: "Ọnwa ị malitere ịchekwa", everyWeek: "Kwaizu", everyMonth: "Kwa onwa" },
        member: { greeting: { morning: "Ndewo", afternoon: "Ndewo", evening: "Ndewo" }, familySavings: "Nchekwa Ezinụlọ", careFund: "Nkwado", lastPayment: "Ọgwụ Ikpeazụ", alerts: "Mkpọtụ", upToDate: "Ị dị njikere ✓", behind: "Ị nweghị ihe ịchọrọ", recentPayments: "Ọgwụ Ọhụrụ", requestHelp: "Chọọ Nkwado Ezinụlọ", noPayments: "Enweghị ọgwụ ọma." },
        admin: { familyOverview: "Nhọpụta Ezinụlọ", totalMembers: "Ụmụ Ezinụlọ", pendingRequests: "Arịrịọ Nkwado", behindOnSavings: "Ndị Nwere Nhị Ọgwụ", allUpToDate: "Ndị ezinụlọ niile dị njikere ✓", shouldSave: "Ha ga-echekwa", hasSaved: "Ha echeela", gap: "Ọdịda", quickActions: "Omume Ozor", recordPayment: "Dekọọ Ọgwụ", addMember: "Tinye Onye", reviewRequests: "Lelee Arịrịọ" },
        table: { date: "Ụbọchị", type: "Ụdị", amount: "Ego", reason: "Okwu", proof: "Ihe Nkwado", member: "Onye", fund: "Nchekwa", status: "Ụdị", showAll: "Niile", all: "Niile", moneyIn: "Mere Ego", moneyOut: "Mere Ego", totalIn: "Ngụkọta Ego", totalOut: "Ngụkọta Ego", netBalance: "Mkpọ" },
        transaction: { recordPayment: "Dekọọ Ọgwụ", whichMember: "Onye ole?", whichFund: "Kedu nchekwa?", whatType: "Kedu ụdị?", howMuch: "Kedu ego?", whatFor: "Gịnị ka ọ bụ?", whatForHelper: "e.g. Ọgwụ kwa onwa, Ọgwụ ahụike", attachProof: "Tinye akaụntụ", recordBtn: "Dekọọ Ọgwụ", familyMoneyHistory: "Akụkọ Ego Ezinụlọ" },
        careFund: { balance: "Nchekwa Nkwado", requestHelp: "Chọọ Nkwado Ezinụlọ", pastRequests: "Arịrịọ Ole", noRequests: "Ịchọtaghị nkwado ọma", whatFor: "Gịnị ka ọ bụ?", howMuchNeed: "Kedu ego ịchọrọ?", whenOccasion: "Mgbe?", tellMore: "Kọwaa ozo", optional: "ọ na-achọpụta", sendRequest: "Ziga Arịrịọ", accepted: "Akwadoro", pending: "Na-echere", notApproved: "Ọ dịghị" },
        members: { addMember: "Tinye Onye", fullName: "Aha Niile", password: "Paswọọdụ", passwordHelper: "Ha nwere ike ịgbanwe ya", howOften: "Olee ugboro ha na-echekwa?", howMuchEach: "Kedu ego?", startingFrom: "Mmalite?", resetPassword: "Megharịa Paswọọdụ" },
        settings: { myDetails: "M banyere", changePassword: "Gbanwe Paswọọdụ", currentPassword: "Paswọọdụ Ugbu a", newPassword: "Paswọọdụ Ọhụrụ", confirmNew: "Chọpụta Paswọọdụ Ọhụrụ", language: "Asụsụ", installApp: "Wụnye App", installPrompt: "Tinye na bọtịn maka ngwa ngwa", install: "Wụnye", iosInstructions: "Tugharịa bọtịn, mgbe ahụ 'Tinye na Bọtịn'", dismiss: "Kpachapụ", contactManager: "Kpọtụ onye nchịkwa ka ị gbanwe nhọrọ gị" },
        common: { save: "Chekwa", cancel: "Kwụsị", loading: "Na-ebu ụzọ...", error: "Ihe ụfọdụ gbaghara. Biko nwaa ọzọ.", success: "Ọmụmaatụ!", markAllRead: "Dee niile", allCaughtUp: "Ị dị njikere", back: "Laghachi", viewReceipt: "Lelee akaụntụ", justNow: "Ugbu a", yesterday: "Ndịnaa", confirm: "Nhọrọ", delete: "Hụpụ", edit: "Dezie", close: "Mechie", search: "Chọọ", noData: "Enweghị data" },
        validation: { required: "A chọrọ ihe", passwordMismatch: "Paswọọdụ adịghị" },
        errors: {
            pageNotFound: "Peję apụta",
            pageNotFoundDesc: "Peję apụta nke a",
            userNotFound: "Onye ọrụ apụọla",
            wrongPassword: "Paswọọdụ ezighị ezi",
            notAdmin: "Ị abụghị admin",
            useAdminLogin: "Jiri admin login"
        },
        occasions: { birthday: "Mkpụrụ Obodo", wedding: "Igodo Ụlọ", newBaby: "Nwa Nzoputa", graduation: "Mmemme", medical: "Ahụike", other: "Ihe ndị ọzọ" }
    },
    ha: {
        app: { name: "Odelade Family Ledger", tagline: "Adadin kudi dangi, a cikin wuri guda" },
        nav: { home: "Gida", mySavings: "Kudina", careFund: "Taimakon Juna", myHistory: "Tarihi", settings: "Saiti", notifications: "Sanarwa", recordPayment: "Rikodi Biyan", familySavings: "Kudin Dangi", helpRequests: "Buƙatar Taimako", familyMembers: "Yan Uwa" },
        auth: { yourName: "Sunan Ka", password: "Kalmar Sirri", signIn: "Shiga", createAccount: "Ƙirƙiri Asusu Na", fullName: "Cikakken Sunan Ka", fullNameHelper: "Shigar da sunan ka kamar yadda dangin ya sani", createPassword: "Ƙirƙiri Kalmar Sirri", createPasswordHelper: "Zabi abin da za ka tuna", confirmPassword: "Tabbatar da Kalmar Sirri", confirmPasswordHelper: "Shigar da kalmar sirri kuma", managerPassword: "Kalmar Sirri ta Manaja", signInAsManager: "Shiga a matsayin Manaja", backToFamily: "← Koma shigar dangin", alreadyHave: "Kana da asusu?", noAccount: "Ba ka da asusu?", wrongCredentials: "Sunan ko kalmar sirri ba daidai ba." },
        register: { howOften: "yanayin ajiyar ku?", howMuch: "kudin da kuke ajiye kowane lokaci?", howMuchHelper: "adadin da kuke shirin ajiye akai-akai", whenStart: "Lokacin fara?", whenStartHelper: "wata da kuke fara ajiyar", everyWeek: "Kowane Mako", everyMonth: "Kowane Wata" },
        member: { greeting: { morning: "Sannu", afternoon: "Sannu", evening: "Sannu" }, familySavings: "Kudin Dangi", careFund: "Taimakon Juna", lastPayment: "Bayanin Karshe", alerts: "Sanarwa", upToDate: "Kuna nan ✓", behind: "Kuna azaba", recentPayments: "Bayanin Kwanaki", requestHelp: "Buƙatar Taimako", noPayments: "Babu bayanin da aka rubuta." },
        admin: { familyOverview: "Gani na Dangi", totalMembers: "Yan Uwa", pendingRequests: "Buƙatar Taimako", behindOnSavings: "Waɗanda ba su biya ba", allUpToDate: "Dukan yan uwa sun biya ✓", shouldSave: "Ya kamata", hasSaved: "Sun biya", gap: "Ragowar", quickActions: "Aikin Yau", recordPayment: "Rikodi Biyan", addMember: "Ƙara Baya", reviewRequests: "Gani Buƙata" },
        table: { date: "Ranar", type: "Nau'i", amount: "Adadin", reason: "Dalili", proof: "Hujja", member: "Mutum", fund: "Kudi", status: "Yanayi", showAll: "Duka", all: "Duka", moneyIn: "Shigarwa", moneyOut: "Fitarwa", totalIn: "Jimlar Shigarwa", totalOut: "Jimlar Fitarwa", netBalance: "Ragowar" },
        transaction: { recordPayment: "Rikodi Biyan", whichMember: "Wane ne?", whichFund: "Wace kundi?", whatType: "Wane nau'i?", howMuch: "Nawa?", whatFor: "Dalili?", whatForHelper: "e.g. kudin wata, kudin likita", attachProof: "Shigar da hujja", recordBtn: "Rikodi Biyan", familyMoneyHistory: "Tarihin Kudin Dangi" },
        careFund: { balance: "Adadin Taimako", requestHelp: "Buƙatar Taimako", pastRequests: "Buƙatun Da Wuce", noRequests: "Ba ku yi buƙatar taimako ba", whatFor: "Menene dalili?", howMuchNeed: "Nawa kuke buƙata?", whenOccasion: "Lokaci?", tellMore: "Ka bayyana", optional: "ba dole ba ne", sendRequest: "Aika Buƙatar", accepted: "An amince", pending: "A makale", notApproved: "Ba a amince ba" },
        members: { addMember: "Ƙara Baya", fullName: "Cikakken Suna", password: "Kalmar Sirri", passwordHelper: "Za su iya canza daga baya", howOften: "yanayin ajiyar su?", howMuchEach: "nawa kowane lokaci?", startingFrom: "fara daga?", resetPassword: "Sake Kalmar Sirri" },
        settings: { myDetails: "Bayanina", changePassword: "Canza Kalmar Sirri", currentPassword: "Kalmar Sirri ta Yanzu", newPassword: "Sabuwar Kalmar Sirri", confirmNew: "Tabbatar da sabuwar kalmar sirri", language: "Harshe", installApp: "Shigar da App", installPrompt: "Ƙara zuwa gidan yanar gizo don samun damar", install: "Shigar", iosInstructions: "Danna maɓallin raba, sannan 'Ƙara zuwa Gidan Yanar Gizo'", dismiss: "A gujewa", contactManager: "Tuntuɓi manajan don canza tsarin ajiyar ku" },
        common: { save: "Ajiye", cancel: "Soke", loading: "Ana loda...", error: "Wasu abubuwa sun tafiya ba daidai ba.", success: "Nasara!", markAllRead: "Gane duk", allCaughtUp: "Kun yi nasara", back: "Koma", viewReceipt: "Dubi rusull", justNow: "Yanzu", yesterday: "Shekara", confirm: "Tabbatar", delete: "Goge", edit: "Shirya", close: "Rufe", search: "Nema", noData: "Babu data" },
        validation: { required: "Wannan filin ana bukatarsa", passwordMismatch: "Kalmomin sirri ba daidai ba" },
        errors: {
            pageNotFound: "Shafi Ba Samu",
            pageNotFoundDesc: "Shafin da kuke nema ba samo ba",
            userNotFound: "Ba a samu mai amfani",
            wrongPassword: "Kalmar sirri ba daidai ba",
            notAdmin: "Ba kai admin ba",
            useAdminLogin: "Yi amfani da admin login"
        },
        occasions: { birthday: "Ranar Haihuwa", wedding: "Aure", newBaby: "Haifuwa", graduation: "Kammalawa", medical: "Lafiya", other: "Wani" }
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function t(key) {
    const keys = key.split('.');
    let value = translations[currentLang];
    for (const k of keys) {
        if (value && value[k] !== undefined) {
            value = value[k];
        } else {
            // Fallback to English
            value = translations.en;
            for (const k2 of keys) {
                if (value && value[k2] !== undefined) value = value[k2];
                else return key;
            }
            break;
        }
    }
    return typeof value === 'string' ? value : key;
}

function setLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    closeLangModal();
    router.navigate(window.location.pathname);
    updateLangButtons();
}

function openLangModal() {
    document.getElementById('lang-modal').classList.remove('hidden');
    updateLangButtons();
}

function closeLangModal() {
    document.getElementById('lang-modal').classList.add('hidden');
}

function updateLangButtons() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const check = btn.querySelector('.check');
        if (btn.dataset.lang === currentLang) {
            check.classList.remove('hidden');
            btn.classList.add('bg-brand-light', 'text-brand');
        } else {
            check.classList.add('hidden');
            btn.classList.remove('bg-brand-light', 'text-brand');
        }
    });
}
