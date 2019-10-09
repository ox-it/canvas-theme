Canvas Theme
============

[![Run Status](https://api.shippable.com/projects/5cc6d029daf54c0007db8073/badge?branch=master)](https://app.shippable.com/github/oxctl/canvas-theme/dashboard)

Files to support our Canvas theme at Oxford. Currently there's no API to the themes so it's not possible to have changed in these files automatically published to Canvas. However this repository provides a revision history for changes.

Group Enrollment Tool
---------------------

The group enrollment tool has custom JS/CSS the critical thing is that the JS needs to have the ID of the LTI tool set correctly.

Setup
-----

To set everything up install node and npm and then run:

    npm install

Build
-----

To build the them run:

    npm run build

and this will create 2 files (`build/bundle.js` and `build/bundle.css`). These can then be uploaded to the Canvas theme.
The build isn't complex at the moment.

