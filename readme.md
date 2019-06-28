This is a collection of various technical icons, glyphs, logos and other imagery all in SVG format. The icons are mainly Azure related but there are various other brands and logos plus abstract/generic symbols.

All files are run through [SVGO](https://github.com/svg/svgo) to clean them up and optimize them 

**Icons refreshed/updated: June 28th 2019**

- Azure Docs collection refreshed with a few new services
- Azure Patterns Collection has nearly 200 new icons
- Azure ML icons and App Config added to 'Other'


# Ownership & Copyright
I do not attribute ownership to any of these icons & images. No copyright infringement is intended.  
All files have been sourced and scraped from the public internet and various Microsoft sites. They are collected here under fair use. 


# Icon Galleries
To view the icons, thumbnail gallery pages for each of the main sets is provided. The gallery pages also allow you to search the icons, view them on a range of light & dark backgrounds and also download the icon in SVG or PNG format.  
Note. These galleries only work when viewing this repo from GitHub pages here https://code.benco.io/icon-collection/

## Core Azure Sets

#### [Azure Patterns Collection](azure-patterns)
Probably the best place to start, 900+ icons including all Azure services, this has been scraped from https://azure.microsoft.com/en-gb/patterns/styles/glyphs-icons/ 

#### [Azure Docs](azure-docs)
Scraped from main Azure docs site, all major Azure services are in here plus a couple of other useful icons. In many places this overlaps with the above set, but is a bit more focused on core Azure services making it easier to find what you are looking for.

#### [Microsoft 'Official' Set](official)
This is the official "Microsoft Azure Cloud and AI Symbol / Icon Set - SVG" dated 15/05/2019 fetched from [here](https://www.microsoft.com/en-gb/download/details.aspx?id=41937). This has many overlaps with the other sets, but also contains many unique icons. It's included here in entirety for completeness

---

## Other Sets

#### [Logos & Brands](logos)
Various product, company & programing language logos, hand picked & fetched from various sources online. Theses may or may not be directly Azure related

#### [Other Icons](other)
Many other Azure & Microsoft icons sourced from various places; Azure.com pages, Azure Docs git repo, Azure portal etc. Most of these are hand picked or moved here manually, these shouldn't overlap with the other sets, but may do

#### [Kubernetes Icons (EXTERNAL)](https://github.com/kubernetes/community/tree/master/icons)
Not part of this icon set, but linked here as a useful external resource.  
These are the official Kubernetes icons for all the resource types; pods, nodes, namespaces, etc etc. Available as PNG, SVG and in labeled and unlabeled forms

---

# Scraping & Other Tools
Various Node.js and bash scripts used for scraping, converting and generating the gallery pages are contained in the `_tools` folder. These are provided as-is with minimal documentation. Here be dragons.