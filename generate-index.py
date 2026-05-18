import glob, os

assets = "build/client/assets"
css = os.path.basename(glob.glob(assets + "/main-*.css")[0])
entry = os.path.basename(glob.glob(assets + "/entry.client-*.js")[0])
manifest = os.path.basename(glob.glob(assets + "/manifest-*.js")[0])

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Entheogen Stewardship Project</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="stylesheet" href="/assets/{css}">
</head>
<body>
  <div id="root"></div>
  <script>window.__remixContext={{"basename":"/","future":{{"v3_fetcherPersist":false,"v3_relativeSplatPath":false,"v3_throwAbortReason":false,"v3_singleFetch":false,"v3_lazyRouteDiscovery":false,"unstable_optimizeDates":false}},"isSpaMode":true,"state":{{"loaderData":{{"root":null,"routes/home/route":null}},"actionData":null,"errors":null}}}};</script>
  <script src="/assets/{manifest}"></script>
  <script type="module" src="/assets/{entry}"></script>
</body>
</html>"""

os.makedirs("build/client", exist_ok=True)
open("build/client/index.html", "w").write(html)
print(f"Generated index.html with CSS={css} ENTRY={entry} MANIFEST={manifest}")
