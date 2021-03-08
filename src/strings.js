import React from "react"
import LocalizedStrings from 'react-native-localization';


const strings = new LocalizedStrings({
    en: {

        google: "sign in with Google",
        facebook: "sign in with Facebook",
        sms: "sign in with GSM",
        family: "FAMILY",
        account: "PROFILE",
        plan: "CURRENT PLAN",
        freeplan: "FREE PLAN",
        familyuser: "FAMILY MEMBERS",
        update: "UPGRADE THE PACK",
        support: "SUPPORT",
        logout: "Log Out",
        free: "TRY FOR",
        try: "FREE",
        save: "SAVE",
        areTextOne: "Where your child can be found",
        areTextTwo: "save locations and",
        areTextTree: "arrives or from these areas",
        areTextFour: "You can receive notifications when leaving",
        mypack: "MY PACKAGE",
        changearea: "Enter the region name",
        language: "LANGUAGE OPTION",
        hi: "hi",
        next: "START",
        or: "OR",
        qr: "QR SCANNER",
        login_code: "Enter your code",
        cancel: "Cancel",
        alarm: "ALARM",
        alarmOneText: "Parents can see where you are",
        alarmTwoText: "can come to the rescue. If everything is fine",
        alarmTreeText: "turn off alarm",
        later: "NEXT",
        swipper: "When they do not answer your calls, see where they are live, if you think they are in danger in their environment, Listen to the sounds around them and make sure they are safe with FindMyFamily",
        swipperOne: "Receive notifications when your children, relatives with disabilities or those who always need help (alzhemier, etc.) reach the location you specify, move to or leave the location. See where they are instantly, track their backward location with FindMyFamily.",
        swipperTwo: "Receive instant notifications when you turn off location sharing, constantly monitor the charging time of the device. If his phone is silent or does not hear your calls,Send a vibrating alert. So when the phone is lost, help find it too."
        , swipperTree: "Chat with your loved ones whenever you want with the Find My Family chat feature.",
        swipperFour: "Small children who cannot use a smartphone,And adults who need help stay safe with FindMyFamily.",
        swipperFive: "For your loved ones to always feel safe,Get location information with FindMyFamily SOS. Be with you quickly when it needs you the most.",
        swipperSix: "Try all the features for 3 days, always be closer to your loved ones with FindMyFamily.",
        swipperSixtitle : "Try it free for 3 days",
        home : "Home",
        chat : "Chat",
        area : "Area",
        swipperFiveTitle : "Emergency SOS signal",
        swipperTreeTitle : "Smart watches (GPS Watch, Apple Watch)",
        swipperTreeTitleTwo : "compatible with",
        swipperFourTitle : "Enjoy chat with your family",
        swipperTwoTitle : "Get notified instantly",
        swippertitle : "Your loved ones are safe",
        swippertitleOne : "make sure they are",
        swipperText  :"Where your loved ones are",
        swipperTextOne : "see it all the time",
        registerText : "Are you not a member? Register",
        login : "LOGIN",
        email  :"Enter your email",
        password : "Enter your password",
        passwordAgain : "Enter your password again",
        inputAreaText : "Where your child can be foundsave locations and receive notifications when you arrive or leave these areas",
        treeDay  :"3 DAY"
    },
    tr: {
        account: "HESABIM",
        google: "Google ile giriş yap",
        facebook: "Facebook ile giriş yap",
        sms: "SMS ile giriş yap",
        family: "AİLE",
        plan: "ÜCRETSİZ PLAN",
        familyuser: "AİLE ÜYELERİ",
        update: "PAKETİ YÜKSELT",
        support: "DESTEK",
        logout: "Çıkış Yap",
        free: "ÜCRETSİZ",
        try: "DENE",
        save: "KAYDET",
        mypack: "PAKETİM",
        areTextOne: "Çocuğunuzun bulunabileceği ",
        areTextTwo: "konumlar kaydedip bu bölgelere ",
        areTextTree: "geldiğinde veya bu bölgelerden ",
        areTextFour: "ayrıldığında bildirim alabilirsiniz",
        changearea: "Bölge adı giriniz",
        language: "DİL SEÇENEĞİ",
        hi: "Selam",
        next: "BAŞLA",
        or: "VEYA",
        qr: "QR TARA",
        login_code: "Kodunuzu giriniz",
        cancel: "İptal",
        alarm: "ALARM",
        alarmOneText: "Ebeveynler nerede olduğunu görebilir",
        alarmTwoText: "kurtarmaya gelebilir. Her şey yolundaysa",
        alarmTreeText: "alarmı kapat",
        later: "SONRAKİ",
        swipper: "Aramalarınıza cevap vermediklerinde, canlı olarak nerede olduklarını görün, bulunduğu ortamda tehlikede olduğunu düşünüyorsanız, FindMyFamily ile etrafındaki sesleri dinleyin  ve güvende olduklarından emin olun",
        swipperOne: "Çocuklarınızın, engelli yakınlarınızın ya da her zaman yardıma ihtiyacı olanlarin (alzhemier vb) sizin belirlediğiniz konuma ulaştığında, konuma gittiğinde ya da konumdan ayrıldığında, bildirim alın. Anlık olarak nerede olduklarını görün, geriye  dönük konumlarını FindMyFamily ile takip edin."
        , swipperTwo: "Konum paylaşımını kapattığında anlık olarak bildirim alın,cihazın şarj süresini sürekli takip edin. Telefonu sessizde ise veya aramalarınızı duymuyor ise, titreşimli uyarı gönderin. Böylece telefon kaybolduğunda, bulunmasına da yardımcı olun."
        , swipperTree: "Find My Family sohbet özelliği ile sevdiklerinizle istediğiniz zaman sohbet edin.",
        swipperFour: "Akıllı telefon kullanamayan küçük çocuklar,yardıma ihtiyacı olan yetişkinler de FindMyFamily ile güvende kalsın.",
        swipperFive: "Sevdiklerinizin her zaman güvende olduklarını hissetmeleri için,FindMyFamily SOS ile konum bilgisi alin.Size en çok ihtiyacı olduğu anda hızlıca yanında olun.",
        swipperSix: "3 gün boyunca tüm özellikleri deneyin,FindMyFamily ile sevdiklerinize her zaman daha yakın olun.",
        swipperSixtitle: "3 gün ücretsiz deneyin",
        home : "Ana Sayfa",
        chat : "Mesajlar",
        area  :"Alanlar",
        swipperFiveTitle : "Acil durum SOS sinyali",
        swipperTreeTitle : "Akıllı saatler (GPS Watch, Apple Watch)",
        swipperTreeTitleTwo : "ile uyumlu",
        swipperFourTitle : "Aileniz ile sohbetin tadını çıkarın",
        swipperTwoTitle : "Anında haberdar olun",
        swippertitle: "Sevdiklerinizin güvende",
        swippertitleOne :" olduklarından emin olun",
        swipperText : "Sevdiklerinizin nerede olduğunu ",
        swipperTextOne : "her an görün",
        registerText : "Üye değil misin ? Kayıt Ol",
        login : "GİRİŞ YAP",
        email : "Email giriniz",
        password : "Şifre giriniz",
        passwordAgain : "Şifre Tekrar",
        inputAreaText :"Çocuğunuzun bulunabileceği konumlar kaydedip bu bölgelere geldiğinde veya bu bölgelerden ayrıldığında bildirim alabilirsiniz",
        treeDay : "3 GÜN"

    },
    de: {
        google: "Anmeldung mit Google",
        facebook: "Anmeldung mit Facebook",
        sms: "Anmeldung mit GSM",
        family: "Familie",
        account: "MEIN KONTO",
        plan: "DERZEITIGER PLAN",
        hi: "Helloe",
        update: "Paket-Upgrade",
        familyuser: "FAMILIENMITGLIEDER",
        support: "UNTERSTÜTZUNG",
        logout: "AUSTRAGEN",
        free: "KOSTENLOS ",
        try: "VERSUCHEN",
        save: "SPEICHERN",
        mypack: "MEIN PAKET",
        areTextOne: "Wo Ihr Kind zu finden ist",
        areTextTwo: "Standorte speichern und ",
        areTextTree: "kommt oder aus diesen Bereichen Sie können ",
        areTextFour: "Benachrichtigungen erhalten, wenn Sie abreisen",
        changearea: "Geben Sie den Regionsnamen ein",
        language: "SPRACHENOPTION",
        next: "START",
        or: "ODER",
        qr: "QR SCANNER",
        login_code: "Gib deinen Code ein",
        cancel: "Stornieren",
        alarm: "ALARM",
        alarmOneText: "Eltern können sehen, wo Sie sind",
        alarmTwoText: "kann zur Rettung kommen. Wenn alles in Ordnung ist",
        alarmTreeText: "Alarm ausschalten",
        later: "NÄCHSTER",
        swipper: " Wenn sie Ihre Anrufe nicht beantworten, Sehen Sie, wo sie leben, wenn Sie glauben, dass sie in ihrer Umgebung in Gefahr sind. Hören Sie sich die Geräusche um sie herum an und stellen Sie sicher, dass sie mit FindMyFamily sicher sind",
        swipperOne: "Erhalten Sie Benachrichtigungen, wenn Ihre Kinder, Angehörige mit Behinderungen oder diejenigen, die immer Hilfe benötigen (Alzhemier usw.), den von Ihnen angegebenen Ort erreichen, dorthin ziehen oder den Ort verlassen. Sehen Sie sofort, wo sie sich befinden, und verfolgen Sie mit FindMyFamily ihren rückwärtigen Standort.",
        swipperTwo: "Erhalten Sie sofort Benachrichtigungen, wenn Sie die Standortfreigabe deaktivieren. Verfolgen Sie die Ladezeit des Geräts. Wenn sein Telefon stumm ist oder Ihre Anrufe nicht hört,Senden Sie einen Vibrationsalarm. Wenn das Telefon verloren geht, helfen Sie auch, es zu finden."
        , swipperTree: "Chatten Sie mit Ihren Lieben, wann immer Sie möchten, mit der Chat-Funktion Meine Familie suchen.",
        swipperFour: "Kleine Kinder, die kein Smartphone benutzen können,Und Erwachsene, die Hilfe brauchen, bleiben bei FindMyFamily sicher.",
        swipperFive: "Damit sich Ihre Lieben immer sicher fühlen, Erhalten Sie Standortinformationen mit FindMyFamily SOS. Seien Sie schnell bei Ihnen, wenn es Sie am dringendsten benötigt.",
        swipperSix: "Probieren Sie alle Funktionen 3 Tage lang aus und seien Sie mit FindMyFamily immer näher bei Ihren Lieben.",
        swipperSixtitle : "Probieren Sie es 3 Tage lang kostenlos aus",
        home : "Startseite",
        chat : "Botschaft",
        area : "Felder",
        swipperFiveTitle : "Notfall-SOS-Signal",
        swipperTreeTitle : "Smartwatches (GPS Watch, Apple Watch)",
        swipperTreeTitleTwo :"kompatibel mit",
        swipperFourTitle : "Viel Spaß beim Chatten mit Ihrer Familie",
        swipperTwoTitle : "Lassen Sie sich sofort benachrichtigen",
        swippertitle : "Ihre Lieben sind in Sicherheit",
        swippertitleOne : "Stellen Sie sicher, dass sie sind",
        swipperText : " Wo deine Lieben sind",
        swipperTextOne : "sehe es die ganze Zeit",
        registerText : "Bist du kein Mitglied? Registrieren",
        login : "ANMELDUNG",
        email : "Geben sie ihre E-Mail Adresse ein",
        password :"Geben Sie Ihr Passwort ein",
        passwordAgain : "Geben Sie Ihr Passwort erneut ein",
        inputAreaText: "Wo Ihr Kind zu finden ist Speichern Sie Standorte und erhalten Sie Benachrichtigungen, wenn Sie diese Bereiche erreichen oder verlassen",
        treeDay  :"3 TAGE"
    }
})
export default strings