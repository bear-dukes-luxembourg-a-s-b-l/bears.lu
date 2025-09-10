# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Jekyll-based website for the Bear Dukes Luxembourg community. Use these commands:

- `bundle install` - Install Ruby dependencies
- `bundle exec jekyll serve` - Start development server (auto-reload enabled)
- `bundle exec jekyll build` - Build the site for production

The site runs on Jekyll 4.x with Ruby gems managed through Bundler.

## Architecture

### Content Management System
The website uses Jekyll with a data-driven approach for managing dynamic content:

- **Posts**: Blog posts in `_posts/` using markdown with YAML front matter
- **Data Files**: JSON files in `_data/` manage structured content:
  - `candidates.json` - Bear Pride competition candidates
  - `mrbears.json` - Historical Mr. Bear Luxembourg title holders
  - `events.json` - Bear Pride event schedules
  - `sponsors.json` - Sponsor information
  - `menus.yml` - Site navigation structure

### Bear Pride Feature Toggle
The Bear Pride functionality is controlled by the `bearpride.enabled` boolean in `_config.yml`. When enabled:
- Homepage displays Bear Pride panel with description and Facebook event link
- Candidate listings become available
- Event schedules are shown
- Hotel booking CTA can be displayed

### Layout Structure
- `_layouts/default.html` - Base template
- `_layouts/home.html` - Homepage with Bear Pride integration
- `_layouts/page.html` - Static pages
- `_layouts/post.html` - Blog posts
- `_includes/` - Reusable components for Bear Pride applications, event details, purchase modules

### Content Organization
- Main pages are markdown files in root directory
- Static assets in `assets/` and `uploads/`
- CSS in `_sass/` directory using Sass preprocessing
- Site configuration in `_config.yml` with Bear Pride settings, social media, and SEO

### Data Schema Examples
Mr. Bear entries include year, name, description, image, and social media links.
Candidates have photos array, personal info (name, age), about section, motivation, and social links.
Events contain title, time, venue details, pricing, and external links (Facebook, tickets, RSVP).

The site is deployed on Netlify with auto-launch enabled for development previews.