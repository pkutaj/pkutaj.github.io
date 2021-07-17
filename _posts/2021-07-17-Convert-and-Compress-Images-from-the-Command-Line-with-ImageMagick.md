## usecase
The aim of this how-to-guide🏁 is to teach and illustrate the modification of images from command line that can be used with scripts, via using the tool called ImageMagick.

<!-- TOC -->

- [1. steps](#1-steps)
- [2. usecase/code example](#2-usecasecode-example)

<!-- /TOC -->

### 1. steps
* download from [ImageMagick - Download Page](https://imagemagick.org/script/download.php#windows) & install
* run the following to **optimize for web**
    - I am resizing photos
    - size `800x600`
    - size up to `200 KB`

```
magick convert .\IMG_20210105_1539574.jpg -resize 800x600! -strip -define jpeg:extent=200KB img1.jpg
```

### 2. usecase/code example
* see the subfunction in a [script I wrote for writing a daily family chronicle](https://github.com/pkutaj/kronCLI/blob/master/kron.ps1#L28-L37)

* Input: put large images within a folder defined within the script
* Output: find compressed and renamed images within another folder defined in a script
* Then, the images are linked within a doc with another part of the script such as

```markdown
### 2021-02-12
<!-- TEXT HERE -->
![2021-02-12]({{ site.url }}/assets/2021-02-12-1.jpg)

![2021-02-12]({{ site.url }}/assets/2021-02-12-2.jpg)
```
