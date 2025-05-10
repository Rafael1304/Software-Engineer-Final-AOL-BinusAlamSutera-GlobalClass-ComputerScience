import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      title: "Fitrack Anomaly Analyzer",
      menu_title: "Menu",
      menu_chat: "Chat",
      menu_upload: "Upload",
      menu_result: "View Result",
      menu_settings: "Settings",
      file_upload_title: "Upload your CSV File",
      analyze_now: "Analyze Now",
      uploading: "Uploading...",
      upload_success: "File analyzed successfully!",
      upload_fail: "Failed to analyze file.",
      chatbot_intro: "Hi there! Do you want to analyze your data?",
      chatbot_yes: "Great! You can upload your file below.",
      chatbot_no: "Okay, let me know when you're ready!",
      chatbot_summary_prefix: "Summary",
      chatbot_reset_success: "Analysis has been reset. You can upload a new file now.",
      chatbot_reset_fail: "Failed to reset analysis.",
      chatbot_summary_fail: "Error fetching summary. Is the backend running?",
      chatbot_prompt: "Type your response...",
      send: "Send",
      result_heading: "Analysis Result",
      loading: "Loading...",
      no_summary: "No data analyzed yet. Please upload a file first.",
      settings_title: "Settings",
      dark_mode: "Enable Dark Mode",
      light_mode: "Enable Light Mode",
      choose_language: "Language",
      archive_chat: "Archive Chat",
      chatbot_report_title: "📋 Data Review Report",
      chatbot_report_intro:
        "After analyzing your dataset, we found {{anomalies}} anomalous entries out of {{total}} total rows ({{percent}}% anomaly rate).",
      chatbot_report_advice:
        "This suggests a {{level}} presence of outliers or unusual patterns. Please review or investigate accordingly.",
      significant: "significant",
      minor: "minor"
    }
  },
  id: {
    translation: {
      title: "Penganalisis Anomali Fitrack",
      menu_title: "Menu",
      menu_chat: "Obrolan",
      menu_upload: "Unggah",
      menu_result: "Lihat Hasil",
      menu_settings: "Pengaturan",
      file_upload_title: "Unggah File CSV Anda",
      analyze_now: "Analisis Sekarang",
      uploading: "Mengunggah...",
      upload_success: "File berhasil dianalisis!",
      upload_fail: "Gagal menganalisis file.",
      chatbot_intro: "Halo! Apakah kamu ingin menganalisis datamu?",
      chatbot_yes: "Bagus! Kamu bisa unggah file di bawah ini.",
      chatbot_no: "Oke, beri tahu saya jika sudah siap!",
      chatbot_summary_prefix: "Ringkasan",
      chatbot_reset_success: "Analisis telah direset. Silakan unggah file baru.",
      chatbot_reset_fail: "Gagal mereset analisis.",
      chatbot_summary_fail: "Gagal mengambil ringkasan. Pastikan backend aktif.",
      chatbot_prompt: "Ketik pesan Anda...",
      send: "Kirim",
      result_heading: "Hasil Analisis",
      loading: "Memuat...",
      no_summary: "Belum ada data yang dianalisis. Unggah file terlebih dahulu.",
      settings_title: "Pengaturan",
      dark_mode: "Mode Gelap",
      light_mode: "Mode Terang",
      choose_language: "Bahasa",
      archive_chat: "Arsipkan Obrolan",
      chatbot_report_title: "📋 Laporan Tinjauan Data",
      chatbot_report_intro:
        "Setelah menganalisis dataset Anda, kami menemukan {{anomalies}} entri anomali dari total {{total}} baris ({{percent}}% tingkat anomali).",
      chatbot_report_advice:
        "Ini menunjukkan adanya pola tidak biasa yang {{level}}. Silakan tinjau kembali data Anda.",
      significant: "signifikan",
      minor: "kecil"
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
