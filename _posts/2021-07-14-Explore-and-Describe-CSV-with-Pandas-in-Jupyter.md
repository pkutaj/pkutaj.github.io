## usecase
The aim of this task🎯 is to open and run an initial exploration of a `.csv` file with Pandas

<!-- TOC -->

- [1. code](#1-code)
- [2. notes](#2-notes)
    - [2.1. on pandas data structures](#21-on-pandas-data-structures)
    - [2.2. on jupyter](#22-on-jupyter)

<!-- /TOC -->


### 1. code

| STEP | CODE                                            | COMMENT                                         |
|------|-------------------------------------------------|-------------------------------------------------|
| 1    | `import pandas as pd`                           | import pandas module into notebook              |
| 2    | `df = pd.read_csv(".\\eer.csv", delimiter=",")` | create a dataframe binding with loaded csv data |
| 3    | `# df.columns = df.columns.str.strip()`         | optional: clean whitespace in columns           |
| 4    | `df.head()`                                     | read the first 5 rows                           |

```python
import pandas as pd
df = pd.read_csv(".\\eer.csv", delimiter=",")
# df.columns = df.columns.str.strip()
df.head()
```

### 2. notes
#### 2.1. on pandas data structures
* series: one-dimensional, like an array
* dataframes: two-dimensional, like a table, with rows and columns

#### 2.2. on jupyter
* google based programming environment
* language-agnostic, python typical
