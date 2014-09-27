pagerduty-angular
=================

nice javascript-angular wrapper for pagerduty incidents, let you the ability to search and filter

#How to use?
1. clone the repo
2. [Get token key from pagerduty](https://support.pagerduty.com/hc/en-us/articles/202829310-Generating-an-API-Key)
3. change the credentials details in app.js
```
      // Set base url
      RestangularProvider.setBaseUrl('https://<orgName>.pagerduty.com/api/v1');
      // auth details
      RestangularProvider.setDefaultHeaders({Authorization: 'Token token=<Token>'});
```
* Run web server with python -m SimpleHTTPServer (or any alternative)
