# Codetogive


Technical Overview</h2>
```mermaid
graph TD
    Start --> UserAccessesWebApp
    UserAccessesWebApp --> WordPressBackend
    WordPressBackend --> ReactFrontend
    ReactFrontend --> FetchDynamicData
    FetchDynamicData --> CustomPHPFunctions
    FetchDynamicData --> WordPressAPI
    ReactFrontend --> RenderUIElements
    RenderUIElements --> InteractiveModules
    InteractiveModules --> HandleUserInteractions
    HandleUserInteractions --> CustomPHPFunctions
    HandleUserInteractions --> WordPressDatabase
    CustomPHPFunctions --> WordPressAPI
    WordPressAPI --> RenderUIElements
    WordPressAPI --> HandleUserInteractions
    WordPressDatabase --> End
    CustomPHPFunctions --> End
    WordPressAPI --> End
    RenderUIElements --> End
    HandleUserInteractions --> End
    InteractiveModules --> End
    FetchDynamicData --> End
    ReactFrontend --> End
    WordPressBackend --> End
    UserAccessesWebApp --> End

```
<h2>Problem</h2>
<p>Lack of interactivity and accessibility features in existing games/applications that limit what a child can do and achieve.
<h2>Our Solution🔆</h2>
<p>Provide better accessibility features and add more interactivity to help keep children engaged and optimise their imagination.
