# Pokemon Battler Presentation Rubrics

This file collects the group and individual presentation rubrics for quick reference in future AI chats.

Both rubrics are subject to change. Use this as a planning reference, then verify against the latest course materials before submitting or presenting.

## Quick Checklist

### Group Presentation

- Stay within the 15-20 minute presentation limit.
- Make sure every group member speaks.
- Demonstrate the running application and core workflows.
- Show the project specification in user-facing terms, not implementation details.
- Show repository setup, run instructions, or a distributable artifact.
- Explain remote API usage and mention specific API endpoints or requests.
- Use architecture diagrams to show Clean Architecture and the Dependency Rule.
- Discuss SOLID principles, design patterns, and extensibility.
- Show meaningful package/code organization.
- Show code quality process, preferably including Checkstyle and pull request evidence.
- Show testing evidence, coverage, and documentation of untested areas.
- Include and discuss the accessibility report using E3I terminology.
- Ensure project scope is appropriate for the team size.

### Individual Presentation

- Show before and after views for your use case.
- Show code for your Use Case Interactor.
- Show a class diagram for your full use case.
- Use course terminology accurately.
- Explain the use case clearly and concisely.
- Present directly to the audience without reading from notes.

## Scoring Scale

| Score | Label |
| --- | --- |
| `<= 1/5` | Inadequate |
| `2/5` | Acceptable |
| `3/5` | Good |
| `4/5` | Excellent |
| `5/5` | Exceptional |

## Group Presentation Rubric

The group presentation rubric is out of 100 points.

Most evidence for this rubric should be shown during the presentation. Submitted repository materials, README files, documentation, and code may be used as supporting evidence.

Question answers are not graded as a separate category, but they may affect relevant rubric categories when they clarify or weaken evidence presented by the team.

### Project Scope Cap

After totaling the group rubric points, apply this cap if the project scope is too limited for the team size. Apply the least restrictive cap that is justified by the presented specification, demonstrated functionality, and team size.

| Scope Level | Maximum Group Score | Description |
| --- | ---: | --- |
| Inadequate scope | 70 | The project has fewer meaningful user stories than group members, or most user stories are trivial, duplicative, or not connected to substantial software behaviour. |
| Minimal scope | 80 | Each member has at least one user story, but the user stories are mostly minimal, significantly overlapping, or show little ambition. |
| Somewhat ambitious scope | 90 | Each member has at least one meaningful user story, but there is some overlap, unevenness, or limited ambition across the team. |
| Appropriately ambitious or impressive scope | No cap | Each member has at least one significant and distinct user story that is appropriate for the team size. The project stands out in scope by including non-trivial functionality and requiring meaningful design or implementation decisions, rather than only straightforward or repetitive features. No cap means the project is eligible for full marks, not that full marks are guaranteed. |

### Group Rubric Summary

| Category | Points |
| --- | ---: |
| Overall Presentation | 10 |
| Specification | 10 |
| Functionality | 15 |
| Runnable / Distributable Artifact | 5 |
| API Usage | 5 |
| Clean Architecture | 15 |
| Overall Design (SOLID and Design Patterns) | 15 |
| Code Organization | 5 |
| Code Quality | 5 |
| Testing | 10 |
| Accessibility Report | 5 |
| **Total** | **100** |

### Overall Presentation

**Out of:** 10

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Presentation was significantly incomplete and was clearly not rehearsed by the team. |
| `2/5` Acceptable | Presentation was minimal in places and limited evidence that the team had rehearsed. Slides lacked polish or contained significant errors. |
| `3/5` Good | Presentation contained the required elements and the team had clearly prepared, but could have been improved in specific ways still, such as use of images or proofreading of the slide content. |
| `4/5` Excellent | Presentation was polished and contained the required elements. Visuals were used effectively to enhance the presentation throughout. Presentation must be within the 15-20 minute limit and every group member must speak to achieve this level. |
| `5/5` Exceptional | Presentation goes above and beyond expectations. Significant effort went into the slides, demonstrations, and visuals. Presentation looked professional and was clearly rehearsed. |

### Specification

**Out of:** 10

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | The specification is incomplete and difficult to understand. The specification includes implementation details. |
| `2/5` Acceptable | The specification is somewhat clear, but has room to be improved. The specification somewhat focuses on what the program will do, but there is still some emphasis on how it does it. |
| `3/5` Good | The specification is mostly clear, but could be polished. The specification mostly focuses on what the program will do, but there is still some emphasis on how it does it. |
| `4/5` Excellent | The specification is clear and easy to understand. The specification clearly focuses on what the program will do without mention of how it does it. |
| `5/5` Exceptional | The specification is extremely clear and easy to understand. The specification clearly focuses on what the program will do without mention of how it does it. A non-programmer unfamiliar with the project can easily understand the purpose of the software. |

### Functionality

**Out of:** 15

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Program does not run during the demonstration or provides little evidence that it implements the specified user-facing behaviours. |
| `2/5` Acceptable | Program implements only some of the team's specification. Notable promised functionality is left unimplemented or contains bugs. |
| `3/5` Good | Program satisfies most of the team's specification, but some promised features may be left unimplemented or minor bugs may remain. |
| `4/5` Excellent | Program satisfies the specification. Core workflows are demonstrated successfully. Little to no promised functionality is missing or buggy. |
| `5/5` Exceptional | Program fully satisfies the specification and the implemented functionality is impressive for the team's size. Core workflows work smoothly during the demonstration. No significant bugs are evident. |

### Runnable / Distributable Artifact

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | The team does not show an executable, distributable artifact, repository setup, or clear run instructions during the presentation. A grader cannot reasonably tell how to run the project independently from the submitted materials. |
| `3/5` Good | The team shows during the presentation that the project can be run from the repository or a provided artifact. The team shows the main setup and launch instructions, such as the README, release artifact, run command, or IDE/Gradle/Maven process. Some dependency, configuration, sample data, or API setup details may be incomplete, but a grader can likely run the project with minor troubleshooting. |
| `5/5` Exceptional | The team clearly shows during the presentation a polished and reproducible way to run the submitted project, such as an executable JAR, packaged release, or tested repository run process. Setup instructions are complete, concise, and tested on a fresh checkout or standard environment. Any required configuration, sample data, external services, API limitations, or known launch issues are shown or clearly documented. |

### API Usage

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | No remote API is used in the project. |
| `2/5` Acceptable | Minimal use of a remote API in the project. The remote API usage is not clearly motivated by the program requirements. |
| `3/5` Good | Team made use of one or more remote APIs in their project. The slides do not mention any specific remote API endpoints or requests used by the program. |
| `4/5` Excellent | Team made use of one or more remote APIs in their project. One specific remote API endpoint or request is mentioned in the slides. |
| `5/5` Exceptional | Team made significant use of one or more remote APIs in their project. Two specific remote API endpoints or requests are mentioned in the slides. It is clear how the remote API was used and the remote API was clearly appropriate for the program. |

### Clean Architecture

**Out of:** 15

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Project has few attempts at following Clean Architecture. Dependency Rule clearly violated in the project. |
| `2/5` Acceptable | Project appears to somewhat adhere to Clean Architecture, but there are significant violations of the Dependency Rule. Insufficient discussion of the overall architecture during the presentation. Little to no use of effective diagrams to convey architectural information. |
| `3/5` Good | Project appears to largely adhere to Clean Architecture. The slides contain at least one appropriate diagram to convey the overall architecture and provide evidence that Clean Architecture is being followed. |
| `4/5` Excellent | Project appears to almost completely adhere to Clean Architecture. The slides contain appropriate diagrams to convey the overall architecture and provide strong evidence that Clean Architecture is being followed. Any violations are clearly discussed and adequately justified. |
| `5/5` Exceptional | Project appears to adhere to Clean Architecture. No violations of the Dependency Rule are evident. The group has gone above and beyond to convince the audience of this in the presentation through effective use of architectural diagrams. Any violations are clearly discussed and adequately justified. |

### Overall Design (SOLID and Design Patterns)

**Out of:** 15

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Little to no attempt to discuss the design has been incorporated into the presentation. |
| `2/5` Acceptable | There is some discussion of at least one of the SOLID principles, but it is rather limited. There is an attempt to discuss a design pattern or talk about the extensibility of the program, but it is rather limited. |
| `3/5` Good | A rich discussion of at least one of the SOLID principles is included. A design pattern appropriate to the project, beyond those already implemented in the provided starter code, has been implemented and is clearly described, or an example of how the program has been designed to be extensible has been clearly described. |
| `4/5` Excellent | A rich discussion of at least two of the SOLID principles is included. At least two design patterns appropriate to the project, beyond those already implemented in the provided starter code, have been implemented and clearly described. If only one design pattern is appropriate, the team clearly justifies why adding another pattern would be forced or inappropriate. An example of how the program has been designed to be extensible has been clearly described. |
| `5/5` Exceptional | The group goes above and beyond in conveying the information outlined at the Excellent level, including significant and appropriate use of design patterns. At least one discussed design pattern is not presented in class, or the team gives an especially strong justification for why the chosen pattern or patterns are the most appropriate design choices for the project. |

### Code Organization

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Package structure and code organization need a complete refactoring or package naming conventions are inconsistently applied throughout the project. |
| `2/5` Acceptable | There is some attempt at a meaningful package structure, but the organization is difficult to follow in several places. Package naming conventions are inconsistently applied in multiple places. |
| `3/5` Good | Package structure or code organization could use some work to be more organized and to make it easier to find things, but overall well done. Package naming conventions mostly followed, but there is a clear lack of consistency in one or more package names. |
| `4/5` Excellent | Code is organized in a meaningful and mostly easy-to-follow package structure. Package naming conventions are consistently followed with only minor issues. |
| `5/5` Exceptional | Code is organized in a meaningful way. Easy to follow package structure. Clear that significant thought was put into how the code was organized. Package naming conventions are always properly followed. |

### Code Quality

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Little to no evidence of any team efforts to ensure code quality. |
| `2/5` Acceptable | Some effort was made to ensure code quality, but the details are significantly unclear or the process seems to be inadequate. |
| `3/5` Good | The team clearly put in a reasonable effort to ensure code quality in the main branch. Some details were unclear, but no concerns about the process the team was using. A tool like Checkstyle was not used. |
| `4/5` Excellent | Significant effort was clearly put into ensuring high-quality code was being merged into main. A tool like Checkstyle must be used to earn this level or above. |
| `5/5` Exceptional | Significant effort was clearly put into ensuring high-quality code was being merged into main. The team goes above and beyond in how they describe their process for ensuring code quality, with a pull request example. |

### Testing

**Out of:** 10

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | A clear lack of tests; little to no code coverage. Evidence of code coverage not provided. |
| `2/5` Acceptable | Tests cover over half of the overall code base, meaning greater than 50% line coverage. Evidence of code coverage must be present. |
| `3/5` Good | Tests cover over half of the use case interactor code, meaning greater than 50% line coverage. Tests cover over half of the overall code base, meaning greater than 50% line coverage. Evidence of code coverage must be present. |
| `4/5` Excellent | Tests cover a significant amount of the use case interactor code, meaning greater than 70% line coverage. Tests cover over half of the overall code base, meaning greater than 50% line coverage. Evidence of code coverage and documentation of what was not tested and why is present. |
| `5/5` Exceptional | Tests cover practically all of the use case interactor code, meaning greater than 90% line coverage. Tests cover a significant amount of the overall code base, meaning greater than 70% line coverage. Evidence of code coverage and documentation of what was not tested and why is present and of high quality. |

### Accessibility Report

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | The accessibility report does not contain the required information. |
| `2/5` Acceptable | All Universal Principles are included in the Markdown file; at least one is discussed during the presentation. Target users are identified or a group who may struggle to use the program is identified and discussed using terminology from the E3I modules; neither of these is discussed in the presentation. |
| `3/5` Good | All Universal Principles are included in the Markdown file; at least one is discussed during the presentation. Target users are identified or a group who may struggle to use the program is identified and discussed using terminology from the E3I modules; one of these is discussed in the presentation. |
| `4/5` Excellent | All Universal Principles are included in the Markdown file; at least one is discussed during the presentation. Target users are identified and discussed in the presentation. A group who may struggle to use the program is identified and discussed using terminology from the E3I modules; this is discussed in the presentation. |
| `5/5` Exceptional | The group goes above and beyond in conveying the information outlined at the Excellent level. |

## Individual Presentation Rubric

The individual presentation rubric is out of 20 points.

Most evidence for this rubric should be shown during your individual part of the presentation.

Submitted repository materials, diagrams, documentation, and code may be used as supporting evidence.

### Individual Rubric Summary

| Category | Points |
| --- | ---: |
| Required Elements of Your Use Case are Present | 5 |
| Use of Course Terminology | 5 |
| Explanation of Your Use Case | 5 |
| Verbal Presentation of Your User Story | 5 |
| **Total** | **20** |

### Required Elements of Your Use Case are Present

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | One or more required elements are missing; this rubric element is clearly incomplete. |
| `2/5` Acceptable | All elements are present, but two or more are of clearly low quality. |
| `3/5` Good | All elements are present, but one or more are of clearly low quality. |
| `4/5` Excellent | Required elements: before and after views are shown; code for your Use Case Interactor is shown; a class diagram for your full Use Case is shown. |
| `5/5` Exceptional | All elements are included and are of exceptional quality. |

### Use of Course Terminology

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | No effort to use course terminology, or significant mistakes in how the terminology is applied. |
| `2/5` Acceptable | Minimal use of course terminology. At most three minor issues with how terminology was used. |
| `3/5` Good | Some use of course terminology. At most two minor issues with how terminology was used. |
| `4/5` Excellent | Clear use of course terminology. At most one minor issue with how terminology was used. |
| `5/5` Exceptional | Goes above and beyond to make appropriate use of course terminology. No mistakes in how the terminology is used. |

### Explanation of Your Use Case

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | The explanation of how your use case works is significantly incomplete. |
| `2/5` Acceptable | This use case is minimally explained. The audience has doubts about how the use case works. |
| `3/5` Good | The explanation of the use case is present, but could be improved in either clarity or conciseness. The audience has some doubts about the use case. |
| `4/5` Excellent | The explanation of the use case is clear and concise. The audience is left with little to no doubt about the use case. |
| `5/5` Exceptional | The explanation of the use case is clear and concise. The audience is left with no doubt about the use case. |

### Verbal Presentation of Your User Story

**Out of:** 5

| Score | Criteria |
| --- | --- |
| `<= 1/5` Inadequate | Speaks unclearly and makes no attempt to speak to the audience. |
| `2/5` Acceptable | Speaks reasonably clearly, but makes little to no effort to speak to the audience. |
| `3/5` Good | Speaks mostly effectively but could make more effort to speak to the audience. If you read from notes during this part, you can earn no higher than this level. |
| `4/5` Excellent | Speaks effectively to the audience; no major issues with presentation, but not exceptional. |
| `5/5` Exceptional | Speaks effectively to the audience; the audience feels engaged. |
