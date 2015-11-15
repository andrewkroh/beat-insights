beat-insights
--------------

A dashboard for Elastic Beats developers.

--------------

#### Install

##### Install required tools `npm`, `gulp`, and `bower`:

```
brew install npm
npm install -g gulp bower
npm install
```

##### Develop

```
gulp test
gulp serve
```

##### Publish

```
gulp build
aws s3 sync dist/ s3://<bucket> --acl public-read --delete
```
