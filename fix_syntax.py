import re

with open("backend/server.js", "r", encoding="utf-8") as f:
    js = f.read()

# Fix the syntax error by removing the extra bracket
js = js.replace("""                }
                }
            } catch (emailError) {""", """                }
            } catch (emailError) {""")

with open("backend/server.js", "w", encoding="utf-8") as f:
    f.write(js)
