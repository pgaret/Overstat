# overwatch_project

# Use unofficial Overwatch API to show user and character stats.
# API Git Repo https://github.com/SunDwarf/OWAPI/blob/master/api.md.

Search Form
  - input fields for battletag (up to two players)
  - if second field if blank or invalid, only find first player. (let user know invalid input?)


User Page
  - SHOULD we store all the stats as an attribute of the user?
  - displays a user's overall stats (default)
  - dropdown to select character specific stats
  - charts?

Comparison Page
  - compare two users' stats
  -

MODELS
  - USER
    - user specific stats
  - CHARACTER
    - character stats

TODO
- Green and red comparison values
- Rounding values of data
- How to handle 404's on the character side
