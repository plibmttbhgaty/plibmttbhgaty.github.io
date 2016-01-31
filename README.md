# PLIBMTTBHGATY

## Adding Your Event to the Website

1. Fork this repo
2. Create a branch

`git checkout -b <location-name>-<date>`

3. Update `source/events.json` with your event details. Here's an example:

```
{
  "location": "San Francisco, CA",
  "hostName": "thoughtbot",
  "rsvpUrl": "http://thoughtbot-plibmttbhgaty-sf.eventbrite.com",
  "date": "2016-01-03"
}
```

3. Open a pull request to merge your branch into
   `plibmttbhgaty.github.io:middleman`
4. Once your pull request has been reviewed and merged by a maintainer, delete
   your branch

## How to Work With the Site

The site is static and generated using [Middleman](https://middlemanapp.com/).

### Installfest

1. Install [Ruby](https://www.ruby-lang.org/en/). Middleman is a Ruby app, so you'll need to install at least Ruby 1.9.3, but preferably 2+.
2. Install [Bundler](http://bundler.io/): `$ gem install bundler`
3. Fork this repository, clone your fork locally, `cd` into the new `plibmttbhgaty.github.io` directory, and switch to the `middleman` branch.
4. Install your dependencies: `$ bundle install`
5. Start the dev server: `$ bundle exec middleman server`
6. Open `http://0.0.0.0:4567` in your browser.

### Publishing

#### If You Don't Have Commit Rights

Submit your changes as a pull request to the [main repository](http://github.com/plibmttbhgaty/plibmttbhgaty.github.io) for review by the maintainers.

#### If You Do Have Commit Rights

Commit your changes to the `middleman` branch and push to the remote. To deploy changes to the site, run `$ bundle exec middleman deploy`. If you have commit rights, the site will build, and the static files will get pushed into the `master` branch.
