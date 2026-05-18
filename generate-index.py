import glob, os

assets = "build/client/assets"
files = os.listdir(assets)
entry = [f for f in files if f.startswith("entry.client-")][0]
manifest = [f for f in files if f.startswith("manifest-")][0]
css = [f for f in files if f.endswith(".css")]

css_line = ""
if css:
    css_line = <link
