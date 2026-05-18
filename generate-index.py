import glob, os

assets = "build/client/assets"
entry = os.path.basename(glob.glob(assets + "/entry.client-*.js")[0])
manifest = os.path.basename(glob.glob(assets + "/manifest-*.js")[0])

# CSS is optional - globe.gl handles its own styling
css_files = glob.glob(assets + "/main-*.css") + glob.glob(assets + "/index-*.css")
css = os.path.basename(css_files[0]) if css_files else None

css_link = f<link
