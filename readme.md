This is a collection of various technical icons, glyphs, logos and other imagery all in SVG format. The icons are mainly Azure related but there are various other brands and logos plus abstract/generic symbols.

All files are run through [SVGO](https://github.com/svg/svgo) to clean them up and optimize them, with 'removeDimensions' plugin enabled

Many overlaps exist between the three main Azure icon sets, this expected, but each set also has unique icons hence their reason for inclusion. Condensing down to one merged super-set would be a huge undertaking  

# Changelog
[View change log](./CHANGELOG.md)


# Ownership & Copyright
I do not attribute ownership to any of these icons & images. No copyright infringement is intended.  
All files have been sourced and scraped from the public internet and various Microsoft sites. They are collected here under fair use. 

Microsoft permits the use of these icons in architectural diagrams, training materials, or documentation. You may copy, distribute, and display the icons only for the permitted use unless granted explicit permission by Microsoft. Microsoft reserves all other rights.  
Don’t crop, flip or rotate icons  
Don’t distort or change icon shape in any way  
Don’t use Microsoft product icons to represent your product or service  

# Icon Galleries
To view the icons, thumbnail gallery pages for each of the main sets is provided. The gallery pages also allow you to search the icons, view them on a range of light & dark backgrounds and also download the icon in SVG or PNG format.  
Note. These galleries only work when viewing this repo from GitHub pages here https://code.benco.io/icon-collection/

If viewing the downloaded icons in Windows, install [PowerToys](https://github.com/microsoft/PowerToys/releases/) and enable the 'File Explorer Preview' module as it supports showing SVGs as thumbnails within explorer

## Core Azure Sets

#### ['Official' Azure Icons Set](azure-icons)
This set is the official downloadable collection from the [Azure Architecture Center](https://docs.microsoft.com/en-us/azure/architecture/icons/), the best place to look if you're after an Azure service or common Azure related icon. The set has been flattened (no sub-directories) and superfluous prefixes removed from the filenames 

#### [Azure Docs](azure-docs)
Scraped from main Azure docs site, all major Azure services are in here plus a couple of other useful icons. It's a smallish set and a good place to start if you require an icon for a top level Azure service.

#### ['CDS' Azure Icons Set](azure-cds)
This set comprises the "Microsoft Azure Icon Repository" from the Microsoft Cloud Design Studio. There is an almost complete overlap with the above two sets, however there's some unique icons in here, and icons from the Azure portal which aren't anywhere else.

#### [Azure Patterns Collection](azure-patterns)
Very large set of 1200+ icons including many Azure services, but mostly focused on other concepts, actions and gyphs. This has been scraped from https://azure.microsoft.com/en-gb/patterns/styles/glyphs-icons/ This is made public, as part of the "Sundog" Azure.com design system.


## Other Sets

#### [Logos & Brands](logos)
Various product, company & programing language logos, hand picked & fetched from various sources online. Theses may or may not be directly Azure related

#### [Other Icons](other)
Many other Azure & Microsoft icons sourced from various places; Azure.com pages, Azure Docs git repo, Azure portal etc. Most of these are hand picked or moved here manually, these shouldn't overlap with the other sets, but may do

## Links to Other Collections
These are not part of this icon set, but linked to here as a useful external resources 

##### [Kubernetes Icons ⇗](https://github.com/kubernetes/community/tree/master/icons)
The official Kubernetes icons for all the resource types; pods, nodes, namespaces, etc etc. Available as PNG, SVG and in labeled and unlabeled forms

##### [CNCF Logos ⇗](https://github.com/cncf/artwork)
Logos and icons for CNCF and CNCF projects

##### [Simpleicons.org ⇗](https://simpleicons.org/)
Free SVG mono-coloured icons for popular projects & brands

##### [Font Awesome ⇗](https://fontawesome.com/icons?d=gallery&m=free)
Huge set of over 5,000 icons, free set of over 1,500 which can be downloaded as SVG

##### [Amazing Icon Downloader ⇗](https://chrome.google.com/webstore/detail/amazing-icon-downloader/kllljifcjfleikiipbkdcgllbllahaob?hl=en)
Not a set of icons, but a browser extension for Chrome and Edge which allows you to easily grab icons from the Azure portal

---

# Scraping & Other Tools
Various Node.js and bash scripts used for scraping, converting and generating the gallery pages are contained in the `_tools` folder. These are provided as-is with minimal documentation. Here be dragons.