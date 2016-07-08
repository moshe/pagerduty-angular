pagerduty-angular
=================

Angular 1 wrapper for PagerDuty incidents with the ability to search and filter

#Features
1. Look at more then 100 incidents at once
2. Filter by incident state
3. Search in whole incidents
4. NO MORE CTRL+F !!

#How to use?
1. Clone the repo
2. [Get v2 access token from PagerDuty](https://support.pagerduty.com/hc/en-us/articles/202829310-Generating-an-API-Key)
3. Update app.js to include your API access token
```
// Enter a valid PagerDuty v2 REST API token
var apiKey = 'ENTER_YOUR_API_KEY_HERE';
```
* Start running a web server i.e Python's [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html)
```
python -m SimpleHTTPServer
```
