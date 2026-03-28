pub mod de;
pub mod en;
pub mod es;
pub mod fr;
pub mod it;
pub mod ja;
pub mod ko;
pub mod nl;
pub mod pl;
pub mod pt;
pub mod tr;
pub mod zh;

use leptos::*;
use std::collections::HashMap;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Language {
    De,
    En,
    Nl,
    Pt,
    Es,
    Fr,
    It,
    Ja,
    Ko,
    Zh,
    Pl,
    Tr,
}

impl Language {
    pub fn code(&self) -> &'static str {
        match self {
            Self::De => "de",
            Self::En => "en",
            Self::Nl => "nl",
            Self::Pt => "pt",
            Self::Es => "es",
            Self::Fr => "fr",
            Self::It => "it",
            Self::Ja => "ja",
            Self::Ko => "ko",
            Self::Zh => "zh",
            Self::Pl => "pl",
            Self::Tr => "tr",
        }
    }

    pub fn label(&self) -> &'static str {
        match self {
            Self::De => "Deutsch",
            Self::En => "English",
            Self::Nl => "Nederlands",
            Self::Pt => "Português",
            Self::Es => "Español",
            Self::Fr => "Français",
            Self::It => "Italiano",
            Self::Ja => "日本語",
            Self::Ko => "한국어",
            Self::Zh => "中文",
            Self::Pl => "Polski",
            Self::Tr => "Türkçe",
        }
    }

    pub fn from_code(code: &str) -> Option<Self> {
        match code {
            "de" => Some(Self::De),
            "en" => Some(Self::En),
            "nl" => Some(Self::Nl),
            "pt" => Some(Self::Pt),
            "es" => Some(Self::Es),
            "fr" => Some(Self::Fr),
            "it" => Some(Self::It),
            "ja" => Some(Self::Ja),
            "ko" => Some(Self::Ko),
            "zh" => Some(Self::Zh),
            "pl" => Some(Self::Pl),
            "tr" => Some(Self::Tr),
            _ => None,
        }
    }

    pub fn all() -> &'static [Language] {
        &[
            Self::De,
            Self::En,
            Self::Nl,
            Self::Pt,
            Self::Es,
            Self::Fr,
            Self::It,
            Self::Ja,
            Self::Ko,
            Self::Zh,
            Self::Pl,
            Self::Tr,
        ]
    }

    fn translations(&self) -> &'static HashMap<&'static str, &'static str> {
        match self {
            Self::De => de::translations(),
            Self::En => en::translations(),
            Self::Nl => nl::translations(),
            Self::Pt => pt::translations(),
            Self::Es => es::translations(),
            Self::Fr => fr::translations(),
            Self::It => it::translations(),
            Self::Ja => ja::translations(),
            Self::Ko => ko::translations(),
            Self::Zh => zh::translations(),
            Self::Pl => pl::translations(),
            Self::Tr => tr::translations(),
        }
    }
}

const STORAGE_KEY: &str = "claude_admin_lang";

/// Detect language: localStorage → navigator.language → Deutsch.
fn detect_language() -> Language {
    // Try localStorage
    if let Ok(Some(storage)) = web_sys::window()
        .unwrap_or_else(|| panic!("no window"))
        .local_storage()
    {
        if let Ok(Some(code)) = storage.get_item(STORAGE_KEY) {
            if let Some(lang) = Language::from_code(&code) {
                return lang;
            }
        }
    }

    // Try navigator.language
    if let Some(nav_lang) = web_sys::window().and_then(|w| w.navigator().language()) {
        let prefix = nav_lang.split('-').next().unwrap_or("");
        if let Some(lang) = Language::from_code(prefix) {
            return lang;
        }
    }

    Language::De
}

/// Save language to localStorage.
pub fn persist_language(lang: Language) {
    if let Ok(Some(storage)) = web_sys::window()
        .unwrap_or_else(|| panic!("no window"))
        .local_storage()
    {
        let _ = storage.set_item(STORAGE_KEY, lang.code());
    }
}

/// Provide i18n context — call at the top of App().
pub fn provide_i18n() {
    let lang = create_rw_signal(detect_language());
    provide_context(lang);
}

/// Get the current language signal from context.
pub fn use_language() -> RwSignal<Language> {
    use_context::<RwSignal<Language>>().expect("i18n context not provided")
}

/// Translate a key. Returns a reactive Signal<String> that re-renders on language change.
/// Fallback chain: selected language → Deutsch → key itself.
pub fn t(key: &'static str) -> Signal<String> {
    let lang = use_language();
    Signal::derive(move || {
        let current = lang.get();
        // Try current language
        if let Some(val) = current.translations().get(key) {
            if !val.is_empty() {
                return val.to_string();
            }
        }
        // Fallback to German
        if current != Language::De {
            if let Some(val) = Language::De.translations().get(key) {
                if !val.is_empty() {
                    return val.to_string();
                }
            }
        }
        // Final fallback: return key
        key.to_string()
    })
}
