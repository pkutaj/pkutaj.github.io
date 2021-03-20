## usecase
The aim of this tutorial🔍 is to go through the steps needed to convert markdown into pdf using pandoc and miktex.

<!-- TOC -->

- [1. install pandoc with chocholatey](#1-install-pandoc-with-chocholatey)
- [2. install miktex for pdf engine](#2-install-miktex-for-pdf-engine)
    - [2.1. remove page numbering](#21-remove-page-numbering)
    - [2.2. resize images](#22-resize-images)
    - [2.3. adding the title](#23-adding-the-title)
    - [2.4. change fonts](#24-change-fonts)
- [3. sources](#3-sources)

<!-- /TOC -->

### 1. install pandoc with chocholatey
* install from [Chocolatey Software — Pandoc 2.12](https://chocolatey.org/packages/pandoc)

```
choco install pandoc
```

### 2. install miktex for pdf engine
* install from [Getting MiKTeX](https://miktex.org/download)
* test run with 

```
pandoc -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm" -f markdown-implicit_figures -o <output_name>.pdf <input_name>.md
```

#### 2.1. remove page numbering
* add the following at the top of the markdown file

```
\pagenumbering{gobble}
```

#### 2.2. resize images
* when merging add `{ width=70% }` after the image link to have
* the following is a link_attribute of latex

```
![2021-01-20]({{ site.url }}/assets/2021-01-20-3.jpg){ width=70% }
```

#### 2.3. adding the title 
* I want to start the section with a larger title
* add the following to the top of the merged markdown file to have _01-2021_ as the section title

```
% 01-2021
```

#### 2.4. change fonts
* checking the list of fonts in [The LaTeX Font Catalogue – Front Page](https://tug.org/FontCatalogue/)
* adding YAML header to the top of the merged file

```
pandoc -V fontfamily:Alegreya -V geometry:"top=2cm, bottom=1.5cm, left=2cm, right=2cm" -f markdown-implicit_figures -o <output_name>.pdf <input_name>.md
```
 
### 3. sources
* [Pandoc - Pandoc User’s Guide](https://pandoc.org/MANUAL.html#extension-link_attributes)
* [Total newbie confusion with pandoc and changing fonts on pdf export - TeX - LaTeX Stack Exchange](https://tex.stackexchange.com/questions/526271/total-newbie-confusion-with-pandoc-and-changing-fonts-on-pdf-export)
