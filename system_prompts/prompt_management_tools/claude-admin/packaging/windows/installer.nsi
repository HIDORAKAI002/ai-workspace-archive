!include "MUI2.nsh"

!ifndef VERSION
  !define VERSION "0.0.0"
!endif

Name "ClaudeAdmin"
OutFile "ClaudeAdmin-${VERSION}-Setup.exe"
InstallDir "$LOCALAPPDATA\Programs\ClaudeAdmin"
InstallDirRegKey HKCU "Software\ClaudeAdmin" "InstallDir"
RequestExecutionLevel user

; --- UI settings ---
!define MUI_ABORTWARNING

; --- Pages ---
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES

!define MUI_FINISHPAGE_RUN "$INSTDIR\launcher.bat"
!define MUI_FINISHPAGE_RUN_TEXT "Launch ClaudeAdmin"
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "English"

; --- Install ---
Section "Install"
    SetOutPath $INSTDIR

    File "claude-admin-backend.exe"
    File "launcher.bat"
    File "LICENSE"
    File "README.md"

    ; Uninstaller
    WriteUninstaller "$INSTDIR\Uninstall.exe"

    ; Remember install dir
    WriteRegStr HKCU "Software\ClaudeAdmin" "InstallDir" "$INSTDIR"

    ; Start Menu
    CreateDirectory "$SMPROGRAMS\ClaudeAdmin"
    CreateShortcut "$SMPROGRAMS\ClaudeAdmin\ClaudeAdmin.lnk" "$INSTDIR\launcher.bat"
    CreateShortcut "$SMPROGRAMS\ClaudeAdmin\Uninstall ClaudeAdmin.lnk" "$INSTDIR\Uninstall.exe"

    ; Desktop shortcut
    CreateShortcut "$DESKTOP\ClaudeAdmin.lnk" "$INSTDIR\launcher.bat"

    ; Add/Remove Programs
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "DisplayName" "ClaudeAdmin"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "UninstallString" "$\"$INSTDIR\Uninstall.exe$\""
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "QuietUninstallString" "$\"$INSTDIR\Uninstall.exe$\" /S"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "InstallLocation" "$INSTDIR"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "Publisher" "BRUCHMANN [TEC] INNOVATION GMBH"
    WriteRegStr HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "DisplayVersion" "${VERSION}"
    WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "NoModify" 1
    WriteRegDWORD HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin" \
        "NoRepair" 1
SectionEnd

; --- Uninstall ---
Section "Uninstall"
    Delete "$INSTDIR\claude-admin-backend.exe"
    Delete "$INSTDIR\launcher.bat"
    Delete "$INSTDIR\LICENSE"
    Delete "$INSTDIR\README.md"
    Delete "$INSTDIR\Uninstall.exe"
    RMDir "$INSTDIR"

    Delete "$SMPROGRAMS\ClaudeAdmin\ClaudeAdmin.lnk"
    Delete "$SMPROGRAMS\ClaudeAdmin\Uninstall ClaudeAdmin.lnk"
    RMDir "$SMPROGRAMS\ClaudeAdmin"

    Delete "$DESKTOP\ClaudeAdmin.lnk"

    DeleteRegKey HKCU "Software\Microsoft\Windows\CurrentVersion\Uninstall\ClaudeAdmin"
    DeleteRegKey HKCU "Software\ClaudeAdmin"
SectionEnd
