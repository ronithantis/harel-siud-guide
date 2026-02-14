import { useState, useEffect, useRef } from "react";

// ===== DATA: All form steps and their fields =====
const STEPS = [
  {
    id: "welcome",
    title: "ברוכים הבאים",
    icon: "🏠",
    subtitle: "מדריך להגשת תביעת סיעוד בהראל",
    type: "info",
  },
  {
    id: "checklist",
    title: "מה צריך להכין?",
    icon: "📋",
    subtitle: "רשימת מסמכים ופרטים שכדאי שיהיו לידך",
    type: "info",
  },
  {
    id: "personal",
    title: "פרטים אישיים",
    icon: "👤",
    subtitle: "פרטי המבוטח/ת",
    type: "form",
  },
  {
    id: "contact",
    title: "איש קשר",
    icon: "📞",
    subtitle: "מי שילווה את התביעה",
    type: "form",
  },
  {
    id: "residence",
    title: "מקום מגורים",
    icon: "🏡",
    subtitle: "היכן שוהה המבוטח/ת כיום",
    type: "form",
  },
  {
    id: "medical",
    title: "מידע רפואי",
    icon: "🏥",
    subtitle: "פרטי האירוע והרופאים המטפלים",
    type: "form",
  },
  {
    id: "bank",
    title: "פרטי בנק",
    icon: "🏦",
    subtitle: "לצורך העברת תגמולים",
    type: "form",
  },
  {
    id: "attachments",
    title: "נספחים נדרשים",
    icon: "📎",
    subtitle: "טפסים שאחרים צריכים למלא",
    type: "info",
  },
  {
    id: "summary",
    title: "סיכום ושליחה",
    icon: "✅",
    subtitle: "בדיקה אחרונה לפני הגשה",
    type: "info",
  },
];

// ===== Tooltip Component =====
function Tooltip({ text, children }) {
  const [show, setShow] = useState(false);
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
      {children}
      <button
        onClick={() => setShow(!show)}
        onBlur={() => setShow(false)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          marginRight: "6px",
          fontSize: "15px",
          color: "#6B8F71",
          padding: "2px 4px",
          borderRadius: "50%",
          lineHeight: 1,
        }}
        aria-label="הסבר"
      >
        ❓
      </button>
      {show && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            background: "#F5F0E8",
            border: "1px solid #D4C9B0",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "13px",
            lineHeight: "1.7",
            color: "#4A4A4A",
            zIndex: 100,
            minWidth: "250px",
            maxWidth: "320px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            animation: "fadeIn 0.2s ease",
          }}
        >
          {text}
        </div>
      )}
    </span>
  );
}

// ===== Field Component =====
function Field({ label, tooltip, children, required }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "14px",
          fontWeight: 600,
          color: "#3D3D3D",
          marginBottom: "6px",
          fontFamily: "'Noto Sans Hebrew', sans-serif",
        }}
      >
        {label}
        {required && <span style={{ color: "#C75B3A", marginRight: "4px" }}>*</span>}
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      {children}
    </div>
  );
}

// ===== Input Styles =====
const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  border: "2px solid #D4C9B0",
  borderRadius: "10px",
  fontSize: "15px",
  fontFamily: "'Noto Sans Hebrew', sans-serif",
  direction: "rtl",
  background: "#FEFCF8",
  color: "#3D3D3D",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

const inputFocusStyle = {
  borderColor: "#6B8F71",
  boxShadow: "0 0 0 3px rgba(107,143,113,0.15)",
};

function TextInput({ value, onChange, placeholder, type = "text", dir }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      dir={dir || "rtl"}
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function TextArea({ value, onChange, placeholder, rows = 4 }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      dir="rtl"
      style={{
        ...inputStyle,
        ...(focused ? inputFocusStyle : {}),
        resize: "vertical",
        minHeight: "80px",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function RadioGroup({ options, value, onChange, name }) {
  return (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      {options.map((opt) => (
        <label
          key={opt.value}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "10px 18px",
            borderRadius: "10px",
            border: `2px solid ${value === opt.value ? "#6B8F71" : "#D4C9B0"}`,
            background: value === opt.value ? "#EDF5EE" : "#FEFCF8",
            cursor: "pointer",
            transition: "all 0.2s",
            fontSize: "14px",
            fontFamily: "'Noto Sans Hebrew', sans-serif",
          }}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            style={{ accentColor: "#6B8F71" }}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}

// ===== Info Card =====
function InfoCard({ icon, title, children, color = "#6B8F71" }) {
  return (
    <div
      style={{
        background: "#FEFCF8",
        border: `2px solid ${color}22`,
        borderRadius: "14px",
        padding: "20px",
        marginBottom: "16px",
        borderRight: `4px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <span style={{ fontSize: "22px" }}>{icon}</span>
        <h4
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: 700,
            color: "#3D3D3D",
            fontFamily: "'Noto Sans Hebrew', sans-serif",
          }}
        >
          {title}
        </h4>
      </div>
      <div
        style={{
          fontSize: "14px",
          lineHeight: "1.8",
          color: "#5A5A5A",
          fontFamily: "'Noto Sans Hebrew', sans-serif",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ===== Checklist Item =====
function CheckItem({ text, checked, onChange }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        padding: "12px 16px",
        borderRadius: "10px",
        background: checked ? "#EDF5EE" : "#FEFCF8",
        border: `1px solid ${checked ? "#6B8F71" : "#E0D8C8"}`,
        marginBottom: "8px",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ accentColor: "#6B8F71", marginTop: "3px", width: "18px", height: "18px" }}
      />
      <span
        style={{
          fontSize: "14px",
          lineHeight: "1.7",
          color: "#3D3D3D",
          fontFamily: "'Noto Sans Hebrew', sans-serif",
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.7 : 1,
        }}
      >
        {text}
      </span>
    </label>
  );
}

// ===== MAIN APP =====
export default function HarelClaimWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [checklist, setChecklist] = useState({});
  const [showAllSteps, setShowAllSteps] = useState(false);
  const contentRef = useRef(null);

  const step = STEPS[currentStep];
  const progress = ((currentStep) / (STEPS.length - 1)) * 100;

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateCheck = (field, value) => {
    setChecklist((prev) => ({ ...prev, [field]: value }));
  };

  const goNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((p) => p + 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep((p) => p - 1);
      if (contentRef.current) contentRef.current.scrollTop = 0;
    }
  };

  // ===== STEP RENDERERS =====
  const renderWelcome = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <div
        style={{
          textAlign: "center",
          padding: "20px 0 30px",
        }}
      >
        <div style={{ fontSize: "56px", marginBottom: "16px" }}>🤝</div>
        <h2
          style={{
            fontSize: "26px",
            fontWeight: 800,
            color: "#3D3D3D",
            marginBottom: "12px",
            fontFamily: "'Noto Sans Hebrew', sans-serif",
            lineHeight: "1.4",
          }}
        >
          מדריך להגשת תביעת סיעוד בהראל
        </h2>
        <p
          style={{
            fontSize: "16px",
            color: "#6A6A6A",
            lineHeight: "1.8",
            maxWidth: "500px",
            margin: "0 auto",
            fontFamily: "'Noto Sans Hebrew', sans-serif",
          }}
        >
          הגשת תביעת סיעוד יכולה להרגיש מסובכת, אבל היא לא חייבת להיות כזו.
          <br />
          המדריך הזה ילווה אתכם שלב אחר שלב, יסביר בשפה פשוטה מה נדרש, ויעזור לכם למלא את הטפסים בביטחון.
        </p>
      </div>

      <InfoCard icon="👨‍👩‍👧‍👦" title="למי המדריך הזה מיועד?">
        בדרך כלל, בני משפחה הם אלה שמגישים את התביעה עבור ההורה או קרוב המשפחה.
        המדריך מדבר אליכם ומנגיש את התהליך.
      </InfoCard>

      <InfoCard icon="📝" title="מה התהליך בקצרה?">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            "ממלאים פרטים אישיים של המבוטח/ת ואיש קשר",
            "מתארים את המצב הרפואי והתפקודי",
            "מצרפים מסמכים רפואיים ואישורים",
            "חותמים על ויתור סודיות (עם עד מהימן)",
            "שולחים להראל ומקבלים מספר תביעה",
          ].map((t, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span
                style={{
                  background: "#6B8F71",
                  color: "white",
                  borderRadius: "50%",
                  width: "26px",
                  height: "26px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {i + 1}
              </span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      </InfoCard>

      <InfoCard icon="⏱️" title="כמה זמן לוקח?">
        מילוי הטפסים עצמם: כ-20 דקות. עם איסוף מסמכים: יכול לקחת יום-יומיים.
        <br />
        לאחר ההגשה, הראל יפתחו תיק תביעה וייצרו קשר טלפוני תוך ימים ספורים.
      </InfoCard>

      <InfoCard icon="⚠️" title="חשוב לדעת" color="#C75B3A">
        הגשת תביעה לא עוצרת את מרוץ ההתיישנות. תקופת ההתיישנות היא 3-5 שנים ממקרה הביטוח, תלוי במועד תחילת הפוליסה.
        אם אתם מתקרבים לגבול - כדאי להתייעץ עם עו"ד.
      </InfoCard>

      {/* PRIVACY & DISCLAIMER */}
      <div
        style={{
          background: "#F5F3EE",
          border: "1px solid #E0D8C8",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ fontSize: "20px" }}>🔒</span>
          <h4
            style={{
              margin: 0,
              fontSize: "15px",
              fontWeight: 700,
              color: "#3D3D3D",
              fontFamily: "'Noto Sans Hebrew', sans-serif",
            }}
          >
            פרטיות, שמירת מידע והעדר אחריות
          </h4>
        </div>
        <div
          style={{
            fontSize: "13px",
            lineHeight: "1.9",
            color: "#5A5A5A",
            fontFamily: "'Noto Sans Hebrew', sans-serif",
          }}
        >
          <strong>🔐 הנתונים שלכם נשמרים אך ורק אצלכם.</strong> כל מה שתמלאו בכלי הזה נשמר בדפדפן שלכם בלבד ואינו נשלח, נאסף או מאוחסן בשום שרת. ברגע שתסגרו את הדף — המידע נמחק. אף גורם אחר אינו חשוף למידע שתזינו.
          <br /><br />
          <strong>📝 אין חובה למלא שום פרט.</strong> הכלי נועד לסייע לכם להתארגן לקראת מילוי טופס התביעה הרשמי של הראל. כל שדה הוא אופציונלי ומשמש כטיוטה אישית בלבד.
          <br /><br />
          <strong>⚖️ הערה משפטית:</strong> כלי זה <strong>אינו</strong> מהווה ייעוץ משפטי, ביטוחי או רפואי, ואינו תחליף להתייעצות עם בעלי מקצוע. הכלי אינו מופעל, ממומן או מאושר על ידי הראל חברה לביטוח בע"מ או כל גורם מוסדי אחר. המידע המוצג מבוסס על ניתוח טופס התביעה הפומבי של הראל ונועד להנגשה בלבד. השימוש בכלי הוא על אחריות המשתמש/ת בלבד, ואין יוצרי הכלי אחראים לכל נזק, עיכוב או תוצאה שתנבע משימוש בו. <strong>בכל ספק — פנו לסוכן ביטוח או עורך דין.</strong>
        </div>
      </div>
    </div>
  );

  const renderChecklist = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <p
        style={{
          fontSize: "15px",
          color: "#5A5A5A",
          lineHeight: "1.8",
          marginBottom: "24px",
          fontFamily: "'Noto Sans Hebrew', sans-serif",
        }}
      >
        לפני שמתחילים למלא, כדאי לאסוף את הדברים הבאים. סמנו מה כבר יש לכם:
      </p>

      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#6B8F71", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        📄 מסמכים בסיסיים
      </h3>
      {[
        "תעודת זהות של המבוטח/ת (כולל ספח)",
        "צילום המחאה מבוטלת או אישור ניהול חשבון בנק",
        "מספר פוליסת הביטוח (אפשר לברר אצל סוכן הביטוח)",
      ].map((t, i) => (
        <CheckItem key={`basic-${i}`} text={t} checked={checklist[`basic-${i}`] || false} onChange={(v) => updateCheck(`basic-${i}`, v)} />
      ))}

      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#6B8F71", marginBottom: "12px", marginTop: "24px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        🏥 מסמכים רפואיים (ככל שיש)
      </h3>
      {[
        "מכתבי שחרור מאשפוז או בית חולים",
        "חוות דעת רופאים מומחים",
        "תוצאות בדיקות רלוונטיות",
        "אבחונים קוגניטיביים (אם רלוונטי)",
        "חוו\"ד אורולוג/גסטרו (במקרה של אי שליטה על סוגרים)",
      ].map((t, i) => (
        <CheckItem key={`med-${i}`} text={t} checked={checklist[`med-${i}`] || false} onChange={(v) => updateCheck(`med-${i}`, v)} />
      ))}

      <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#6B8F71", marginBottom: "12px", marginTop: "24px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        ✍️ טפסים שאחרים ימלאו (יוסבר בהמשך)
      </h3>
      {[
        "טופס ויתור סודיות (חתימה + עד מהימן: עו\"ד/רופא/אחות/סוכן ביטוח)",
        "אישור מטפל סיעודי (עובד זר) או תצהיר בן משפחה מטפל",
        "אישור ביטוח לאומי על הערכת תלות (אם בוצעה)",
      ].map((t, i) => (
        <CheckItem key={`other-${i}`} text={t} checked={checklist[`other-${i}`] || false} onChange={(v) => updateCheck(`other-${i}`, v)} />
      ))}

      <InfoCard icon="💡" title="טיפ חשוב" color="#D4A843">
        לא חייבים שיהיו לכם את כל המסמכים כדי להתחיל. הגישו מה שיש, והראל יודיעו אם חסר משהו.
        העיקר להתחיל את התהליך.
      </InfoCard>
    </div>
  );

  const renderPersonal = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <InfoCard icon="ℹ️" title="על החלק הזה">
        אלה הפרטים האישיים של <strong>המבוטח/ת</strong> — כלומר, של מי שיש לו/לה את פוליסת הסיעוד בהראל.
      </InfoCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="שם משפחה" required tooltip="שם המשפחה כפי שמופיע בתעודת הזהות">
          <TextInput value={formData.lastName} onChange={(v) => updateField("lastName", v)} placeholder="ישראלי" />
        </Field>
        <Field label="שם פרטי" required>
          <TextInput value={formData.firstName} onChange={(v) => updateField("firstName", v)} placeholder="שרה" />
        </Field>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="מספר ת.ז." required tooltip="9 ספרות. ניתן למצוא בתעודת הזהות">
          <TextInput value={formData.idNumber} onChange={(v) => updateField("idNumber", v)} placeholder="000000000" dir="ltr" />
        </Field>
        <Field label="תאריך לידה" required>
          <TextInput value={formData.birthDate} onChange={(v) => updateField("birthDate", v)} type="date" dir="ltr" />
        </Field>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="טלפון נייד" required tooltip="לקבלת עדכונים על מצב התביעה">
          <TextInput value={formData.mobile} onChange={(v) => updateField("mobile", v)} placeholder="050-0000000" dir="ltr" />
        </Field>
        <Field label="טלפון בבית">
          <TextInput value={formData.homePhone} onChange={(v) => updateField("homePhone", v)} placeholder="03-0000000" dir="ltr" />
        </Field>
      </div>

      <Field label="כתובת דוא״ל" tooltip="אם תרצו לקבל עדכונים גם במייל. חובה לציין גם מספר נייד כדי לקבל סיסמה">
        <TextInput value={formData.email} onChange={(v) => updateField("email", v)} placeholder="email@example.com" dir="ltr" />
      </Field>

      <Field label="איך תרצו לקבל עדכונים?">
        <RadioGroup
          name="notificationMethod"
          value={formData.notificationMethod}
          onChange={(v) => updateField("notificationMethod", v)}
          options={[
            { value: "sms", label: "SMS לנייד" },
            { value: "email", label: 'דוא"ל' },
            { value: "mail", label: "דואר ישראל" },
          ]}
        />
      </Field>
    </div>
  );

  const renderContact = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <InfoCard icon="ℹ️" title="למה צריך איש קשר?">
        איש הקשר הוא מי שהראל יפנו אליו לגבי התביעה — בדרך כלל בן/בת משפחה.
        <br />
        <strong>שימו לב:</strong> איש קשר זה <strong>לא</strong> מיופה כוח או אפוטרופוס. אם צריך ייפוי כוח, יש לצרף מסמך נפרד.
      </InfoCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="שם משפחה" required>
          <TextInput value={formData.contactLastName} onChange={(v) => updateField("contactLastName", v)} />
        </Field>
        <Field label="שם פרטי" required>
          <TextInput value={formData.contactFirstName} onChange={(v) => updateField("contactFirstName", v)} />
        </Field>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="מספר ת.ז." required>
          <TextInput value={formData.contactId} onChange={(v) => updateField("contactId", v)} dir="ltr" />
        </Field>
        <Field label="קרבה למבוטח/ת" required tooltip="למשל: בן, בת, נכד/ה, אח/ות">
          <TextInput value={formData.contactRelation} onChange={(v) => updateField("contactRelation", v)} placeholder="בת" />
        </Field>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="טלפון נייד" required>
          <TextInput value={formData.contactMobile} onChange={(v) => updateField("contactMobile", v)} dir="ltr" />
        </Field>
        <Field label="טלפון בבית">
          <TextInput value={formData.contactHomePhone} onChange={(v) => updateField("contactHomePhone", v)} dir="ltr" />
        </Field>
      </div>

      <Field label='כתובת דוא"ל'>
        <TextInput value={formData.contactEmail} onChange={(v) => updateField("contactEmail", v)} dir="ltr" />
      </Field>

      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#6B8F71", marginTop: "20px", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        כתובת איש הקשר
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
        <Field label="רחוב">
          <TextInput value={formData.contactStreet} onChange={(v) => updateField("contactStreet", v)} />
        </Field>
        <Field label="מספר בית">
          <TextInput value={formData.contactHouseNum} onChange={(v) => updateField("contactHouseNum", v)} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
        <Field label="יישוב">
          <TextInput value={formData.contactCity} onChange={(v) => updateField("contactCity", v)} />
        </Field>
        <Field label="שכונה">
          <TextInput value={formData.contactNeighborhood} onChange={(v) => updateField("contactNeighborhood", v)} />
        </Field>
        <Field label="מיקוד">
          <TextInput value={formData.contactZip} onChange={(v) => updateField("contactZip", v)} dir="ltr" />
        </Field>
      </div>
    </div>
  );

  const renderResidence = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <InfoCard icon="ℹ️" title="למה זה חשוב?">
        מקום המגורים משפיע על סוג הפיצוי ועל המסמכים שצריך לצרף.
        מבוטח שגר בבית צריך להוכיח שהוא מקבל טיפול סיעודי ברוב שעות היממה.
      </InfoCard>

      <Field label="היכן שוהה המבוטח/ת כיום?" required>
        <RadioGroup
          name="residenceType"
          value={formData.residenceType}
          onChange={(v) => updateField("residenceType", v)}
          options={[
            { value: "home", label: "🏠 בבית" },
            { value: "assisted", label: "🏘️ דיור מוגן / בית אבות" },
            { value: "nursing", label: "🏥 מוסד סיעודי / גריאטרי" },
          ]}
        />
      </Field>

      {formData.residenceType === "home" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "12px" }}>
            <Field label="רחוב">
              <TextInput value={formData.resStreet} onChange={(v) => updateField("resStreet", v)} />
            </Field>
            <Field label="מספר בית">
              <TextInput value={formData.resHouseNum} onChange={(v) => updateField("resHouseNum", v)} />
            </Field>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="יישוב">
              <TextInput value={formData.resCity} onChange={(v) => updateField("resCity", v)} />
            </Field>
            <Field label="מיקוד">
              <TextInput value={formData.resZip} onChange={(v) => updateField("resZip", v)} dir="ltr" />
            </Field>
          </div>

          <InfoCard icon="📌" title="נדרש: אישור על טיפול סיעודי" color="#C75B3A">
            למבוטח השוהה בביתו, יש לצרף אחד מהבאים:
            <br />
            <strong>אפשרות א':</strong> אישור מעובד/ת זר/ה — כולל היתר העסקה, שהעובד/ת שוהה מעל 12 שעות ביממה.
            <br />
            <strong>אפשרות ב':</strong> תצהיר בן משפחה — שמאשר שהוא/היא מטפל/ת ברוב שעות היממה. נדרש אימות עו"ד.
            <br />
            <em>הטפסים הרלוונטיים יופיעו בשלב הנספחים.</em>
          </InfoCard>
        </>
      )}

      {(formData.residenceType === "assisted" || formData.residenceType === "nursing") && (
        <>
          <Field label="שם המוסד / בית אבות / דיור מוגן" required>
            <TextInput value={formData.institutionName} onChange={(v) => updateField("institutionName", v)} />
          </Field>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <Field label="מחלקה">
              <TextInput value={formData.institutionDept} onChange={(v) => updateField("institutionDept", v)} />
            </Field>
            <Field label="תאריך כניסה">
              <TextInput value={formData.institutionDate} onChange={(v) => updateField("institutionDate", v)} type="date" dir="ltr" />
            </Field>
          </div>
          {formData.residenceType === "nursing" && (
            <InfoCard icon="🧾" title="קבלות חודשיות" color="#D4A843">
              אם השהות במוסד סיעודי משפיעה על גובה הפיצוי, יש להעביר קבלות חודשיות על תשלום למוסד.
              עד שהקבלות מגיעות, הפיצוי ישולם לפי שהות בבית.
            </InfoCard>
          )}
        </>
      )}
    </div>
  );

  const renderMedical = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <InfoCard icon="ℹ️" title="על החלק הזה">
        ספרו בקצרה על המצב הרפואי שהוביל לצורך בסיעוד.
        אין צורך בשפה רפואית — כתבו במילים שלכם.
        ככל שתצרפו יותר מסמכים רפואיים, כך התהליך יהיה מהיר יותר.
      </InfoCard>

      {/* ===== CLAIM TYPE SELECTOR ===== */}
      <Field
        label="מה עיקר הסיבה לתביעה?"
        required
        tooltip="אפשר לסמן גם שניהם. למשל, אדם עם דמנציה שגם מתקשה בהלבשה ורחצה."
      >
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {[
            { value: "functional", label: "🦽 מוגבלות תפקודית", desc: "קושי בפעולות יומיומיות: קימה, הלבשה, רחצה, אכילה, שליטה על סוגרים, ניידות" },
            { value: "cognitive", label: "🧠 תשישות נפש", desc: "ירידה קוגניטיבית: אלצהיימר, דמנציה, בלבול, צורך בהשגחה" },
            { value: "both", label: "🔄 שניהם", desc: "גם מוגבלות תפקודית וגם ירידה קוגניטיבית" },
          ].map((opt) => (
            <label
              key={opt.value}
              style={{
                flex: "1 1 200px",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "14px 16px",
                borderRadius: "12px",
                border: `2px solid ${formData.claimType === opt.value ? "#6B8F71" : "#D4C9B0"}`,
                background: formData.claimType === opt.value ? "#EDF5EE" : "#FEFCF8",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="radio"
                  name="claimType"
                  value={opt.value}
                  checked={formData.claimType === opt.value}
                  onChange={() => updateField("claimType", opt.value)}
                  style={{ accentColor: "#6B8F71" }}
                />
                <span style={{ fontWeight: 700, fontSize: "14px" }}>{opt.label}</span>
              </div>
              <span style={{ fontSize: "12px", color: "#7A7A7A", lineHeight: "1.5", paddingRight: "26px" }}>
                {opt.desc}
              </span>
            </label>
          ))}
        </div>
      </Field>

      {/* ===== COGNITIVE / DEMENTIA EXPLANATION ===== */}
      {(formData.claimType === "cognitive" || formData.claimType === "both") && (
        <InfoCard icon="🧠" title="מה זה תשישות נפש?" color="#7B6BA5">
          <strong>תשישות נפש</strong> היא מצב של פגיעה קוגניטיבית — ירידה ביכולת החשיבה, הזיכרון, ההתמצאות במקום ובזמן, והשיפוט.
          <br /><br />
          <strong>דוגמאות נפוצות:</strong> אלצהיימר, דמנציה וסקולרית, דמנציה מסוגים אחרים, בלבול כרוני.
          <br /><br />
          <strong>מה התנאי לזכאות?</strong> שהמבוטח/ת זקוק/ה להשגחה <strong>ברוב שעות היממה</strong> בשל הפגיעה הקוגניטיבית, כפי שנקבע ע"י רופא מומחה.
          <br /><br />
          <strong>מי מאבחן?</strong> רק רופא מומחה באחד מהתחומים הבאים:
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "8px" }}>
            {["גריאטר", "פסיכיאטר", "פסיכוגריאטר", "נוירולוג"].map((spec) => (
              <span
                key={spec}
                style={{
                  background: "#EDE8F5",
                  color: "#5B4D8A",
                  padding: "4px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                  fontWeight: 600,
                }}
              >
                {spec}
              </span>
            ))}
          </div>
          <br />
          <strong>💡 טיפ חשוב:</strong> אם יש אבחון ממרפאת זיכרון או מרופא מומחה — צרפו אותו. זה מאוד מסייע לתביעה.
          הראל עצמם ישלחו רופא מומחה לבדיקה, אבל אבחון קיים מחזק את התיק.
        </InfoCard>
      )}

      {/* ===== FUNCTIONAL EXPLANATION ===== */}
      {(formData.claimType === "functional" || formData.claimType === "both") && (
        <InfoCard icon="🦽" title="מוגבלות תפקודית — מה נבדק?" color="#6B8F71">
          הזכאות נבדקת לפי היכולת לבצע <strong>6 פעולות יומיומיות</strong> (ADL). הראל בודקים האם המבוטח/ת לא מסוגל/ת לבצע לפחות 50% מכל פעולה:
          <div style={{ marginTop: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {[
              { icon: "🛏️", text: "לקום ולשכב" },
              { icon: "👕", text: "להתלבש ולהתפשט" },
              { icon: "🚿", text: "להתרחץ" },
              { icon: "🍽️", text: "לאכול ולשתות" },
              { icon: "🚽", text: "שליטה על סוגרים" },
              { icon: "🚶", text: "ניידות" },
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
                <span>{a.icon}</span><span>{a.text}</span>
              </div>
            ))}
          </div>
          <br />
          מספר הפעולות שבהן צריך להיות תלוי — תלוי בתנאי הפוליסה הספציפית שלכם.
          <br />
          <strong>💡 הבדיקה תתבצע ע"י איש מקצוע מטעם הראל בביתכם</strong> — אתם לא צריכים להוכיח את זה לבד.
        </InfoCard>
      )}

      {/* ===== MEDICAL HISTORY ===== */}
      <Field label="תארו את ההשתלשלות הרפואית" required tooltip="מה המחלה/האירוע? מתי התחיל? אילו טיפולים/אשפוזים עבר המבוטח? תארו בחופשיות.">
        <TextArea
          value={formData.medicalHistory}
          onChange={(v) => updateField("medicalHistory", v)}
          placeholder={
            formData.claimType === "cognitive" || formData.claimType === "both"
              ? "למשל: אבא אובחן עם דמנציה מסוג אלצהיימר בשנת 2021 במרפאת הזיכרון בבי\"ח שיבא. מאז חלה ירידה משמעותית — לא מזהה בני משפחה, מתבלבל בזמן ובמקום, צריך השגחה צמודה..."
              : "למשל: אמא אובחנה עם אלצהיימר בשנת 2022. מאז המצב הידרדר בהדרגה. באוגוסט 2024 אושפזה בביה״ח בגלל נפילה..."
          }
          rows={6}
        />
      </Field>

      <Field label="האם ביטוח לאומי ביצע הערכת תלות?" tooltip="אם כן, זה יכול לסייע לתביעה">
        <RadioGroup
          name="bituachLeumi"
          value={formData.bituachLeumi}
          onChange={(v) => updateField("bituachLeumi", v)}
          options={[
            { value: "yes", label: "כן" },
            { value: "no", label: "לא" },
            { value: "unknown", label: "לא יודע/ת" },
          ]}
        />
      </Field>

      {/* ===== MEMORY CLINICS (for cognitive claims) ===== */}
      {(formData.claimType === "cognitive" || formData.claimType === "both") && (
        <>
          <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#7B6BA5", marginTop: "24px", marginBottom: "8px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
            🧠 מרפאות זיכרון ומוסדות קוגניטיביים
          </h3>
          <p style={{ fontSize: "13px", color: "#7A7A7A", marginBottom: "12px", lineHeight: "1.6", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
            אם המבוטח/ת ביקר/ה במרפאת זיכרון, מרפאה נוירולוגית, או כל מוסד שביצע אבחון קוגניטיבי — ציינו כאן. זה עוזר להראל לאסוף מסמכים מהר יותר.
          </p>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <TextInput
                value={formData[`memoryClinic${i}`]}
                onChange={(v) => updateField(`memoryClinic${i}`, v)}
                placeholder={
                  i === 0
                    ? 'למשל: מרפאת זיכרון, בי"ח שיבא'
                    : i === 1
                    ? 'למשל: מרפאה נוירולוגית, בי"ח איכילוב'
                    : "מוסד נוסף (אם יש)"
                }
              />
            </div>
          ))}
        </>
      )}

      {/* ===== FAMILY DOCTOR ===== */}
      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#6B8F71", marginTop: "24px", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        רופא/ת משפחה
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
        <Field label="שם הרופא/ה">
          <TextInput value={formData.familyDoctor} onChange={(v) => updateField("familyDoctor", v)} />
        </Field>
        <Field label="סניף">
          <TextInput value={formData.doctorBranch} onChange={(v) => updateField("doctorBranch", v)} />
        </Field>
        <Field label="קופת חולים">
          <TextInput value={formData.kupat} onChange={(v) => updateField("kupat", v)} />
        </Field>
      </div>

      {/* ===== SPECIALISTS ===== */}
      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#6B8F71", marginTop: "24px", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        רופאים מומחים מטפלים (אם יש)
      </h3>
      {[0, 1].map((i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <Field label="שם הרופא/ה">
            <TextInput value={formData[`specialist${i}Name`]} onChange={(v) => updateField(`specialist${i}Name`, v)} />
          </Field>
          <Field label="תחום התמחות">
            <TextInput
              value={formData[`specialist${i}Field`]}
              onChange={(v) => updateField(`specialist${i}Field`, v)}
              placeholder={
                (formData.claimType === "cognitive" || formData.claimType === "both")
                  ? "גריאטר, נוירולוג, פסיכוגריאטר..."
                  : "נוירולוג, אורתופד..."
              }
            />
          </Field>
          <Field label="שם המרפאה">
            <TextInput value={formData[`specialist${i}Clinic`]} onChange={(v) => updateField(`specialist${i}Clinic`, v)} />
          </Field>
        </div>
      ))}

      {/* ===== HOSPITALIZATIONS ===== */}
      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#6B8F71", marginTop: "24px", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        אשפוזים (אם היו)
      </h3>
      {[0, 1].map((i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
          <Field label="בית חולים">
            <TextInput value={formData[`hospital${i}`]} onChange={(v) => updateField(`hospital${i}`, v)} />
          </Field>
          <Field label="מחלקה / מרפאה">
            <TextInput value={formData[`hospitalDept${i}`]} onChange={(v) => updateField(`hospitalDept${i}`, v)} />
          </Field>
          <Field label="תאריכי אשפוז">
            <TextInput value={formData[`hospitalDates${i}`]} onChange={(v) => updateField(`hospitalDates${i}`, v)} placeholder="מ... עד..." />
          </Field>
        </div>
      ))}
    </div>
  );

  const renderBank = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <InfoCard icon="ℹ️" title="למה צריך פרטי בנק?">
        אם התביעה תאושר, תגמולי הביטוח יועברו לחשבון הבנק.
        <strong> החשבון חייב להיות בישראל ועל שם המבוטח/ת.</strong>
        <br />
        יש לצרף צילום המחאה מבוטלת או אישור ניהול חשבון.
      </InfoCard>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="שם הבנק" required>
          <TextInput value={formData.bankName} onChange={(v) => updateField("bankName", v)} placeholder="לאומי, הפועלים..." />
        </Field>
        <Field label="שם הסניף">
          <TextInput value={formData.branchName} onChange={(v) => updateField("branchName", v)} />
        </Field>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        <Field label="מספר סניף" required>
          <TextInput value={formData.branchNumber} onChange={(v) => updateField("branchNumber", v)} dir="ltr" />
        </Field>
        <Field label="מספר חשבון" required>
          <TextInput value={formData.accountNumber} onChange={(v) => updateField("accountNumber", v)} dir="ltr" />
        </Field>
      </div>

      <InfoCard icon="💡" title="טיפ" color="#D4A843">
        אם אין למבוטח חשבון בנק בישראל, יש לפתוח אחד. לא ניתן להעביר תשלום לחשבון בחו"ל.
      </InfoCard>

      <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#6B8F71", marginTop: "20px", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
        מינוי סוכן ביטוח לטיפול בתביעה (אופציונלי)
      </h3>
      <InfoCard icon="🤵" title="מה זה אומר?">
        אם יש לכם סוכן ביטוח, אפשר לתת לו הרשאה לטפל בתביעה ולקבל את כל ההתכתבויות בשמכם. זה לא חובה.
      </InfoCard>
      <Field label="שם סוכן הביטוח (אם רלוונטי)">
        <TextInput value={formData.agentName} onChange={(v) => updateField("agentName", v)} />
      </Field>
    </div>
  );

  const renderAttachments = () => (
    <div style={{ animation: "fadeIn 0.4s ease" }}>
      <p
        style={{
          fontSize: "15px",
          color: "#5A5A5A",
          lineHeight: "1.8",
          marginBottom: "24px",
          fontFamily: "'Noto Sans Hebrew', sans-serif",
        }}
      >
        בנוסף לטופס שמילאתם, יש מספר נספחים שצריך לצרף. חלקם ממולאים על ידי אחרים.
        הנה הסבר על כל אחד:
      </p>

      <InfoCard icon="🔓" title="טופס ויתור סודיות (חובה)" color="#C75B3A">
        <strong>מה זה?</strong> טופס שמאפשר להראל לקבל מידע רפואי מקופות חולים, בתי חולים וגורמים אחרים.
        <br /><br />
        <strong>מי חותם?</strong> המבוטח/ת (או אפוטרופוס).
        <br /><br />
        <strong>מה מיוחד?</strong> נדרש <strong>עד מהימן</strong> — רופא, אחות, עו"ד, עובד סוציאלי או סוכן ביטוח — שיאשר שהחתימה שייכת למבוטח.
        <br /><br />
        <strong>טיפ:</strong> אפשר לחתום על זה במרפאה אצל האחות או הרופא.
        אל תמלאו רק חלק מהטופס — זה יגרום לעיכוב.
      </InfoCard>

      <InfoCard icon="👩‍⚕️" title="הערכה תפקודית / קוגניטיבית (ממולא ע״י הראל)">
        <strong>מה זה?</strong> בדיקה שבודקת האם המבוטח עומד בתנאי הזכאות — יכולת לבצע 6 פעולות יומיומיות
        (קימה, הלבשה, רחצה, אכילה, שליטה על סוגרים, ניידות) או מצב של תשישות נפש.
        <br /><br />
        <strong>מי מבצע?</strong> איש מקצוע מטעם הראל, אחרי שהתביעה מוגשת.
        <br /><br />
        <strong>אתם לא צריכים למלא את החלק הזה.</strong> הוא מצורף כאן רק לידיעתכם.
      </InfoCard>

      {formData.residenceType === "home" && (
        <InfoCard icon="🏠" title="אישור טיפול סיעודי בבית (חובה למבוטח בבית)" color="#C75B3A">
          כיוון שהמבוטח שוהה בבית, נדרש אחד מהבאים:
          <br /><br />
          <strong>אפשרות א' — מטפל/ת זר/ה:</strong>
          <br />
          אישור שהעובד/ת הזר/ה מטפל/ת ברוב שעות היממה (מעל 12 שעות).
          יש לצרף היתר העסקה + הסכם העסקה מול לשכה מורשית.
          הטופס כולל גם גרסה באנגלית.
          <br /><br />
          <strong>אפשרות ב' — בן משפחה מטפל:</strong>
          <br />
          תצהיר שבן/בת המשפחה מעניק/ה טיפול אישי ברוב שעות היממה.
          <strong> נדרש אימות חתימה על ידי עורך דין.</strong>
          יש לצרף צילום ת.ז. של המטפל/ת.
        </InfoCard>
      )}

      <InfoCard icon="📋" title="מערכת כללים לבירור תביעות">
        הראל מצרפים מסמך שמפרט את הזכויות שלכם בתהליך — לוחות זמנים, זכות להשיג על החלטה, ועוד.
        <strong> זה לידיעתכם בלבד, אין צורך למלא כלום.</strong>
      </InfoCard>
    </div>
  );

  const [showReport, setShowReport] = useState(false);
  const reportRef = useRef(null);

  const generateReportData = () => {
    const filled = (field) => formData[field] && formData[field].toString().trim();
    const today = new Date().toLocaleDateString("he-IL");
    const insuredName = filled("firstName") && filled("lastName")
      ? `${formData.firstName} ${formData.lastName}`
      : "לא צוין";

    const formSections = [
      {
        title: "פרטים אישיים של המבוטח/ת",
        icon: "👤",
        items: [
          { label: "שם מלא", value: filled("firstName") && filled("lastName") ? `${formData.firstName} ${formData.lastName}` : null },
          { label: "ת.ז.", value: filled("idNumber") ? formData.idNumber : null },
          { label: "תאריך לידה", value: filled("birthDate") ? formData.birthDate : null },
          { label: "טלפון נייד", value: filled("mobile") ? formData.mobile : null },
          { label: "טלפון בבית", value: filled("homePhone") ? formData.homePhone : null },
          { label: 'דוא"ל', value: filled("email") ? formData.email : null },
        ],
      },
      {
        title: "איש קשר לתביעה",
        icon: "📞",
        items: [
          { label: "שם מלא", value: filled("contactFirstName") && filled("contactLastName") ? `${formData.contactFirstName} ${formData.contactLastName}` : null },
          { label: "ת.ז.", value: filled("contactId") ? formData.contactId : null },
          { label: "קרבה", value: filled("contactRelation") ? formData.contactRelation : null },
          { label: "טלפון נייד", value: filled("contactMobile") ? formData.contactMobile : null },
          { label: 'דוא"ל', value: filled("contactEmail") ? formData.contactEmail : null },
        ],
      },
      {
        title: "מקום מגורים",
        icon: "🏡",
        items: [
          { label: "סוג מגורים", value: formData.residenceType === "home" ? "בית" : formData.residenceType === "assisted" ? "דיור מוגן / בית אבות" : formData.residenceType === "nursing" ? "מוסד סיעודי" : null },
          ...(formData.residenceType === "home" ? [
            { label: "כתובת", value: filled("resStreet") ? `${formData.resStreet} ${formData.resHouseNum || ""}, ${formData.resCity || ""}` : null },
          ] : []),
          ...((formData.residenceType === "assisted" || formData.residenceType === "nursing") ? [
            { label: "שם מוסד", value: filled("institutionName") ? formData.institutionName : null },
            { label: "תאריך כניסה", value: filled("institutionDate") ? formData.institutionDate : null },
          ] : []),
        ],
      },
      {
        title: "מידע רפואי",
        icon: "🏥",
        items: [
          { label: "סוג התביעה", value: formData.claimType === "functional" ? "מוגבלות תפקודית" : formData.claimType === "cognitive" ? "תשישות נפש" : formData.claimType === "both" ? "מוגבלות תפקודית + תשישות נפש" : null },
          { label: "תיאור המצב", value: filled("medicalHistory") ? "מולא ✓" : null },
          { label: "בדיקת ביטוח לאומי", value: formData.bituachLeumi === "yes" ? "כן" : formData.bituachLeumi === "no" ? "לא" : formData.bituachLeumi === "unknown" ? "לא ידוע" : null },
          { label: "רופא/ת משפחה", value: filled("familyDoctor") ? formData.familyDoctor : null },
          { label: "קופת חולים", value: filled("kupat") ? formData.kupat : null },
          ...((formData.claimType === "cognitive" || formData.claimType === "both") ? [
            { label: "מרפאת זיכרון 1", value: filled("memoryClinic0") ? formData.memoryClinic0 : null },
            { label: "מרפאת זיכרון 2", value: filled("memoryClinic1") ? formData.memoryClinic1 : null },
            { label: "מרפאת זיכרון 3", value: filled("memoryClinic2") ? formData.memoryClinic2 : null },
          ].filter(i => i.value) : []),
        ],
      },
      {
        title: "פרטי בנק",
        icon: "🏦",
        items: [
          { label: "בנק", value: filled("bankName") ? formData.bankName : null },
          { label: "סניף", value: filled("branchNumber") ? `${formData.branchName || ""} (${formData.branchNumber})` : null },
          { label: "מספר חשבון", value: filled("accountNumber") ? formData.accountNumber : null },
        ],
      },
    ];

    // Checklist-based documents
    const checklistLabels = {
      "basic-0": "תעודת זהות של המבוטח/ת (כולל ספח)",
      "basic-1": "צילום המחאה מבוטלת או אישור ניהול חשבון",
      "basic-2": "מספר פוליסת הביטוח",
      "med-0": "מכתבי שחרור מאשפוז",
      "med-1": "חוות דעת רופאים מומחים",
      "med-2": "תוצאות בדיקות רלוונטיות",
      "med-3": "אבחונים קוגניטיביים",
      "med-4": "חוו\"ד אורולוג/גסטרו (אי שליטה על סוגרים)",
      "other-0": "טופס ויתור סודיות (חתימה + עד מהימן)",
      "other-1": "אישור מטפל סיעודי / תצהיר בן משפחה",
      "other-2": "אישור ביטוח לאומי על הערכת תלות",
    };

    const docsReady = [];
    const docsMissing = [];
    Object.entries(checklistLabels).forEach(([key, label]) => {
      if (checklist[key]) docsReady.push(label);
      else docsMissing.push(label);
    });

    // Always-required attachments
    const alwaysRequired = [
      { text: "טופס תביעה חתום (טופס הראל המקורי)", tip: "יש למלא על סמך הפרטים שמילאתם כאן, להדפיס ולחתום" },
      { text: "טופס ויתור סודיות חתום עם עד מהימן", tip: "עד מהימן: רופא, אחות, עו\"ד, עובד סוציאלי או סוכן ביטוח" },
      { text: "צילום ת.ז. כולל ספח", tip: "" },
      { text: "צילום המחאה מבוטלת / אישור ניהול חשבון", tip: "על שם המבוטח/ת" },
    ];
    if (formData.residenceType === "home") {
      alwaysRequired.push({
        text: "אישור טיפול סיעודי ברוב שעות היממה",
        tip: "אישור מעובד/ת זר/ה (+ היתר העסקה) או תצהיר בן משפחה מאומת ע\"י עו\"ד"
      });
    }
    if (formData.residenceType === "nursing") {
      alwaysRequired.push({
        text: "קבלות חודשיות ממוסד סיעודי",
        tip: "נדרש להעביר חודש בחודשו"
      });
    }
    if (formData.claimType === "cognitive" || formData.claimType === "both") {
      alwaysRequired.push({
        text: "אבחון קוגניטיבי / חוות דעת רופא מומחה בתחום",
        tip: "מגריאטר, פסיכיאטר, פסיכוגריאטר או נוירולוג. אם יש אבחון ממרפאת זיכרון — צרפו אותו"
      });
    }

    return { formSections, docsReady, docsMissing, alwaysRequired, insuredName, today };
  };

  const printReport = () => {
    const report = generateReportData();
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const html = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
<meta charset="UTF-8">
<title>דוח מוכנות - תביעת סיעוד ${report.insuredName}</title>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;600;700;800&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Noto Sans Hebrew', sans-serif; color: #3D3D3D; padding: 40px; max-width: 800px; margin: 0 auto; font-size: 14px; line-height: 1.7; }
  h1 { font-size: 22px; color: #3D3D3D; margin-bottom: 4px; }
  h2 { font-size: 17px; color: #6B8F71; margin: 28px 0 12px; padding-bottom: 6px; border-bottom: 2px solid #E8E0D0; }
  h3 { font-size: 15px; color: #5A7D60; margin: 20px 0 10px; }
  .subtitle { color: #8A8A8A; font-size: 13px; margin-bottom: 24px; }
  .header-line { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px; }
  .section { margin-bottom: 8px; }
  .row { display: flex; padding: 6px 0; border-bottom: 1px solid #F0EBE0; }
  .row-label { font-weight: 600; min-width: 140px; color: #5A5A5A; }
  .row-value { color: #3D3D3D; }
  .row-missing { color: #C75B3A; font-style: italic; }
  .status-box { display: inline-block; padding: 3px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }
  .status-ok { background: #EDF5EE; color: #4A7A50; }
  .status-missing { background: #FEF3F0; color: #C75B3A; }
  .doc-item { padding: 6px 0; border-bottom: 1px solid #F0EBE0; display: flex; align-items: flex-start; gap: 8px; }
  .doc-icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
  .doc-tip { font-size: 12px; color: #8A8A8A; margin-top: 2px; }
  .todo-box { background: #FEF8F0; border: 2px solid #E8D5B0; border-radius: 12px; padding: 20px; margin: 24px 0; }
  .todo-box h3 { color: #C08A30; margin-top: 0; }
  .summary-box { background: #EDF5EE; border: 2px solid #B8D4BC; border-radius: 12px; padding: 20px; margin: 24px 0; }
  .summary-box h3 { color: #4A7A50; margin-top: 0; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 2px solid #E8E0D0; font-size: 12px; color: #AAAAAA; text-align: center; }
  @media print { body { padding: 20px; } .no-print { display: none; } }
</style>
</head>
<body>
<div class="header-line">
  <h1>📋 דוח מוכנות — תביעת סיעוד</h1>
</div>
<div class="subtitle">עבור: <strong>${report.insuredName}</strong> &nbsp;|&nbsp; תאריך הפקה: ${report.today}</div>

<button class="no-print" onclick="window.print()" style="background: #6B8F71; color: white; border: none; padding: 10px 28px; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; font-family: 'Noto Sans Hebrew', sans-serif; margin-bottom: 20px;">🖨️ הדפסה</button>

${report.formSections.map(section => {
  const filledItems = section.items.filter(i => i.value);
  const missingItems = section.items.filter(i => !i.value);
  const allFilled = missingItems.length === 0 && filledItems.length > 0;
  return `
<h2>${section.icon} ${section.title} <span class="status-box ${allFilled ? 'status-ok' : 'status-missing'}">${allFilled ? '✓ הושלם' : '⚠ חסר מידע'}</span></h2>
<div class="section">
${filledItems.map(i => `<div class="row"><span class="row-label">${i.label}:</span><span class="row-value">${i.value}</span></div>`).join("")}
${missingItems.map(i => `<div class="row"><span class="row-label">${i.label}:</span><span class="row-missing">לא מולא — יש להשלים בטופס</span></div>`).join("")}
</div>`;
}).join("")}

<div class="summary-box">
<h3>✅ מסמכים שכבר ברשותי (${report.docsReady.length})</h3>
${report.docsReady.length > 0
  ? report.docsReady.map(d => `<div class="doc-item"><span class="doc-icon">✅</span><span>${d}</span></div>`).join("")
  : '<div style="color: #8A8A8A; padding: 8px 0;">לא סומנו מסמכים</div>'}
</div>

<div class="todo-box">
<h3>⚠️ מסמכים שעדיין צריך להשיג (${report.docsMissing.length})</h3>
${report.docsMissing.length > 0
  ? report.docsMissing.map(d => `<div class="doc-item"><span class="doc-icon">☐</span><span>${d}</span></div>`).join("")
  : '<div style="color: #6B8F71; padding: 8px 0;">מצוין! כל המסמכים ברשותך ✓</div>'}
</div>

<h2>📎 רשימת צירופים חובה להגשה</h2>
<p style="color: #5A5A5A; margin-bottom: 12px;">אלה המסמכים שחייבים להיות מצורפים לטופס התביעה:</p>
${report.alwaysRequired.map(r => `
<div class="doc-item">
  <span class="doc-icon">☐</span>
  <div>
    <div><strong>${r.text}</strong></div>
    ${r.tip ? `<div class="doc-tip">${r.tip}</div>` : ''}
  </div>
</div>`).join("")}

<h2>📬 דרכי שליחה</h2>
<div class="section">
<div class="row"><span class="row-label">דוא"ל:</span><span class="row-value">tvsiud@harel-ins.co.il</span></div>
<div class="row"><span class="row-label">פקס:</span><span class="row-value">03-7348597</span></div>
<div class="row"><span class="row-label">מסרון:</span><span class="row-value">052-3240345</span></div>
<div class="row"><span class="row-label">דואר:</span><span class="row-value">הראל חברה לביטוח, מח' תביעות סיעוד, אבא הלל 3, ת.ד. 10952, רמת גן 5252202</span></div>
<div class="row"><span class="row-label">בדיקת קבלה:</span><span class="row-value">1-700-702-870 (24 שעות אחרי שליחה)</span></div>
</div>

<div class="footer">
  דוח זה הופק באמצעות כלי הליווי להגשת תביעת סיעוד &nbsp;|&nbsp; אינו מהווה טופס רשמי של הראל &nbsp;|&nbsp; ${report.today}
</div>
</body></html>`;

    printWindow.document.write(html);
    printWindow.document.close();
  };

  const renderSummary = () => {
    const filled = (field) => formData[field] && formData[field].toString().trim();
    const report = generateReportData();

    const totalChecked = report.docsReady.length;
    const totalDocs = report.docsReady.length + report.docsMissing.length;

    const formComplete = report.formSections.every(s => s.items.some(i => i.value));

    return (
      <div style={{ animation: "fadeIn 0.4s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "48px", marginBottom: "12px" }}>🎉</div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#3D3D3D", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
            כל הכבוד! סיימתם את המילוי
          </h2>
          <p style={{ fontSize: "14px", color: "#8A8A8A", marginTop: "6px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
            הנה סיכום של מה שמילאתם ומה עוד חסר
          </p>
        </div>

        {/* FORM COMPLETENESS */}
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#6B8F71", marginBottom: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
          📝 מילוי פרטים:
        </h3>
        {report.formSections.map((s, i) => {
          const filledCount = s.items.filter(item => item.value).length;
          const total = s.items.length;
          const allOk = filledCount === total && total > 0;
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 14px",
                background: allOk ? "#EDF5EE" : "#FEF3F0",
                borderRadius: "10px",
                marginBottom: "8px",
                border: `1px solid ${allOk ? "#6B8F71" : "#E8A090"}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "18px" }}>{allOk ? "✅" : "⚠️"}</span>
                <span style={{ fontSize: "14px", fontFamily: "'Noto Sans Hebrew', sans-serif", color: "#3D3D3D", fontWeight: 600 }}>
                  {s.title}
                </span>
              </div>
              <span style={{ fontSize: "12px", color: allOk ? "#6B8F71" : "#C75B3A", fontWeight: 600 }}>
                {allOk ? "הושלם" : `${filledCount}/${total} שדות`}
              </span>
            </div>
          );
        })}

        {/* DOCUMENTS STATUS */}
        <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#6B8F71", marginBottom: "12px", marginTop: "24px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
          📎 מסמכים:
        </h3>

        {/* Progress bar for docs */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#6A6A6A", marginBottom: "6px" }}>
            <span>מסמכים שסומנו כמוכנים</span>
            <span style={{ fontWeight: 700 }}>{totalChecked} מתוך {totalDocs}</span>
          </div>
          <div style={{ background: "#E8E0D0", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
            <div style={{
              width: `${totalDocs > 0 ? (totalChecked / totalDocs) * 100 : 0}%`,
              height: "100%",
              background: totalChecked === totalDocs ? "#6B8F71" : "linear-gradient(90deg, #D4A843, #E8C560)",
              borderRadius: "4px",
              transition: "width 0.4s ease",
            }} />
          </div>
        </div>

        {report.docsMissing.length > 0 && (
          <InfoCard icon="📌" title={`עוד ${report.docsMissing.length} מסמכים להשיג`} color="#C75B3A">
            {report.docsMissing.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "6px" }}>
                <span>☐</span>
                <span>{d}</span>
              </div>
            ))}
          </InfoCard>
        )}

        {report.docsReady.length > 0 && (
          <InfoCard icon="✅" title={`${report.docsReady.length} מסמכים מוכנים`} color="#6B8F71">
            {report.docsReady.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "4px" }}>
                <span>✓</span>
                <span style={{ textDecoration: "line-through", opacity: 0.7 }}>{d}</span>
              </div>
            ))}
          </InfoCard>
        )}

        {/* GENERATE REPORT BUTTON */}
        <div style={{
          background: "linear-gradient(135deg, #F0EBE0 0%, #E8E0D0 100%)",
          borderRadius: "14px",
          padding: "24px",
          marginTop: "24px",
          textAlign: "center",
          border: "2px solid #D4C9B0",
        }}>
          <div style={{ fontSize: "28px", marginBottom: "10px" }}>📄</div>
          <h3 style={{ fontSize: "17px", fontWeight: 700, color: "#3D3D3D", marginBottom: "8px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
            הפקת דוח אישי
          </h3>
          <p style={{ fontSize: "13px", color: "#6A6A6A", lineHeight: "1.7", marginBottom: "16px", fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
            דוח שמרכז את כל מה שמילאתם, מה עוד חסר, ואילו מסמכים צריך להשיג.
            <br />
            אפשר להדפיס אותו, לשמור כ-PDF, או לשלוח לבני משפחה.
          </p>
          <button
            onClick={printReport}
            style={{
              padding: "12px 36px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #6B8F71, #5A7D60)",
              color: "white",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 700,
              fontFamily: "'Noto Sans Hebrew', sans-serif",
              boxShadow: "0 4px 14px rgba(107,143,113,0.3)",
              transition: "all 0.2s",
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            📄 הפקת דוח מוכנות להדפסה
          </button>
        </div>

        {/* SENDING INFO */}
        <InfoCard icon="📬" title="איך שולחים?" color="#6B8F71">
          <strong>אחרי שתדפיסו, תחתמו ותצרפו את הנספחים</strong>, אפשר לשלוח ב:
          <br /><br />
          ✉️ <strong>מייל:</strong> tvsiud@harel-ins.co.il
          <br />
          📠 <strong>פקס:</strong> 03-7348597
          <br />
          📱 <strong>מסרון:</strong> 052-3240345
          <br />
          📮 <strong>דואר:</strong> הראל חברה לביטוח, מח' תביעות סיעוד, אבא הלל 3, ת.ד. 10952, רמת גן 5252202
          <br />
          💻 <strong>אזור אישי:</strong> דרך אתר הראל
        </InfoCard>

        <InfoCard icon="📞" title="מה קורה אחרי ההגשה?">
          ✓ תקבלו מספר תביעה ומכתב אישור קבלת מסמכים
          <br />
          ✓ נציג אישי ייצור קשר טלפוני
          <br />
          ✓ ברוב המקרים, יתואם ביקור של מעריך תפקודי בבית
          <br />
          ✓ החלטה תתקבל תוך כ-20 ימי עסקים מקבלת כל המסמכים
          <br /><br />
          <strong>לבדיקת קבלת מסמכים:</strong> 1-700-702-870 (מענה 24/7, פעיל 24 שעות אחרי השליחה)
        </InfoCard>

        {/* BACK TO START */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", marginBottom: "8px" }}>
          <button
            onClick={() => {
              if (window.confirm("לחזור להתחלה? הנתונים שמילאת יישמרו.")) {
                setCurrentStep(0);
                if (contentRef.current) contentRef.current.scrollTop = 0;
              }
            }}
            style={{
              padding: "12px 36px",
              borderRadius: "12px",
              border: "2px solid #D4C9B0",
              background: "transparent",
              color: "#6A6A6A",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "'Noto Sans Hebrew', sans-serif",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.borderColor = "#6B8F71"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#D4C9B0"; }}
          >
            🔄 חזרה להתחלה
          </button>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step.id) {
      case "welcome": return renderWelcome();
      case "checklist": return renderChecklist();
      case "personal": return renderPersonal();
      case "contact": return renderContact();
      case "residence": return renderResidence();
      case "medical": return renderMedical();
      case "bank": return renderBank();
      case "attachments": return renderAttachments();
      case "summary": return renderSummary();
      default: return null;
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #F5F0E8 0%, #EDE7DB 50%, #E8E0D0 100%)",
        fontFamily: "'Noto Sans Hebrew', sans-serif",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Hebrew:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; }
        input:focus, textarea:focus { border-color: #6B8F71 !important; box-shadow: 0 0 0 3px rgba(107,143,113,0.15) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #D4C9B0; border-radius: 3px; }
      `}</style>

      <div
        style={{
          width: "100%",
          maxWidth: "820px",
          display: "flex",
          flexDirection: "column",
          height: "calc(100vh - 40px)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "#FEFCF8",
            borderRadius: "18px 18px 0 0",
            padding: "20px 28px 16px",
            borderBottom: "1px solid #E8E0D0",
            boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "28px" }}>{step.icon}</span>
              <div>
                <h1
                  style={{
                    margin: 0,
                    fontSize: "20px",
                    fontWeight: 800,
                    color: "#3D3D3D",
                  }}
                >
                  {step.title}
                </h1>
                <p style={{ margin: 0, fontSize: "13px", color: "#8A8A8A" }}>{step.subtitle}</p>
              </div>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "#8A8A8A",
                background: "#F0EBE0",
                padding: "4px 12px",
                borderRadius: "20px",
                fontWeight: 600,
              }}
            >
              {currentStep + 1} / {STEPS.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ background: "#E8E0D0", borderRadius: "4px", height: "6px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "linear-gradient(90deg, #6B8F71, #8AB592)",
                borderRadius: "4px",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Step dots */}
          <div style={{ display: "flex", gap: "4px", marginTop: "10px", justifyContent: "center", flexWrap: "wrap" }}>
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => { setCurrentStep(i); if (contentRef.current) contentRef.current.scrollTop = 0; }}
                title={s.title}
                style={{
                  width: i === currentStep ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  background: i === currentStep ? "#6B8F71" : i < currentStep ? "#8AB592" : "#D4C9B0",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            overflow: "auto",
            background: "#FEFCF8",
            padding: "28px",
          }}
        >
          {renderStepContent()}
        </div>

        {/* FOOTER NAV */}
        <div
          style={{
            background: "#FEFCF8",
            borderRadius: "0 0 18px 18px",
            padding: "16px 28px",
            borderTop: "1px solid #E8E0D0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 -2px 12px rgba(0,0,0,0.04)",
          }}
        >
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            style={{
              padding: "10px 24px",
              borderRadius: "10px",
              border: "2px solid #D4C9B0",
              background: "transparent",
              color: currentStep === 0 ? "#C4C4C4" : "#6A6A6A",
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: 600,
              fontFamily: "'Noto Sans Hebrew', sans-serif",
              transition: "all 0.2s",
            }}
          >
            → הקודם
          </button>

          {/* HOME BUTTON */}
          {currentStep > 0 && (
            <button
              onClick={() => { setCurrentStep(0); if (contentRef.current) contentRef.current.scrollTop = 0; }}
              title="חזרה לדף הראשון"
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #E0D8C8",
                background: "transparent",
                color: "#8A8A8A",
                cursor: "pointer",
                fontSize: "18px",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#F5F0E8"; e.currentTarget.style.color = "#6B8F71"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8A8A8A"; }}
            >
              🏠
              <span style={{ fontSize: "12px", fontFamily: "'Noto Sans Hebrew', sans-serif", fontWeight: 600 }}>ראשי</span>
            </button>
          )}

          <button
            onClick={goNext}
            disabled={currentStep === STEPS.length - 1}
            style={{
              padding: "10px 32px",
              borderRadius: "10px",
              border: "none",
              background: currentStep === STEPS.length - 1 ? "#D4C9B0" : "linear-gradient(135deg, #6B8F71, #5A7D60)",
              color: "white",
              cursor: currentStep === STEPS.length - 1 ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "'Noto Sans Hebrew', sans-serif",
              transition: "all 0.2s",
              boxShadow: currentStep === STEPS.length - 1 ? "none" : "0 4px 14px rgba(107,143,113,0.3)",
            }}
          >
            {currentStep === STEPS.length - 2 ? "לסיכום ←" : "הבא ←"}
          </button>
        </div>
      </div>
    </div>
  );
}
