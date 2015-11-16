site:
	gulp build

clean:
	gulp clean

serve:
	gulp serve

deps:
	npm install -g gulp bower
	npm install
	bower install

prod:
	aws s3 sync dist/ s3://beat-insights.andrewkroh.com --acl public-read --delete
