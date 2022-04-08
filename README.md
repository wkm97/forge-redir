# Forge Redirection App (Typescript)

## Why?
- Explore Atlassian Forge, future for atlassian app. 
    - Company direction to build or move our app to Forge in the future.
- Build a usable Forge product, discover limitations and methods to overcome in the meantime.

## Why Redirection App?
Keep the scope small, balanced implementation on backend and frontend.

## Scope
- User is able to select the target content/external link in macro configuration.
- Redirect user to the target page in the same instance.
- Redirect user to external links.
- Redirect user after a period of time.

## [Findings on Forge](https://rocketeers.atlassian.net/wiki/spaces/GREENENG/pages/2400223784/Forge+Findings)
- setInternal not working as expected in Forge-UI, the execution is happening in server-side on Atlassian Infrastructure.
- Cannot detect preview/edit mode
- Autocomplete Field in MacroConfig
- testing library similar to `@testing-library/react` is not available for Forge UI.
- `router.navigate` behave different depending on the location
- create modal in custom-ui required [`Modal @forge/bridge`](https://developer.atlassian.com/platform/forge/custom-ui-bridge/modal/)

### Setup
- Develop your app by running `forge tunnel` to proxy invocations locally
- Use the `forge deploy` command when you want to persist code changes.
- Use the `forge install` command when you want to install the app on a new site.
- Once the app is installed on a site, the site picks up the new app changes you deploy without needing to rerun the install command.


## TODO
- https://community.developer.atlassian.com/t/recommendations-for-unit-testing-components-from-the-ui-kit/49437/8

## Custom UI test case
- display correct message
- can trigger router.navigate function
- countdown is working