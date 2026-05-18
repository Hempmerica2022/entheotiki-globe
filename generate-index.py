import glob, os

assets = "build/client/assets"
files = os.listdir(assets)
entry = [f for f in files if f.startswith("entry.client-")][0]
manifest = [f for f in files if f.startswith("manifest-")][0]
css_list = [f for f in files if f.endswith(".css")]

css_line = ""
if css_list:
    css_line = "<link rel=\"stylesheet\" href=\"/assets/" + css_list[0] + \">"

lines = [
    "<!DOCTYPE html>",
    "<html lang=en>",
    "<head>",
    "  <meta charset=utf-8>",
    "  <meta name=viewport content=\"width=device-width,initial-scale=1\">",
    "  <title>Entheogen Stewardship Project</title>",
    "  <link rel=icon type=image/x-icon href=/favicon.ico>",
]
if css_list:
    lines.append("  " + css_line)
lines += [
    "  <style>*{margin:0;padding:0;box-sizing:border-box}html,body{width:100%;height:100%;overflow:hidden;background:#000011}</style>",
    "</head>",
    "<body>",
    "  <div id=root></div>",
    "  <script>window.__remixContext={\"basename\":\"/\",\"future\":{\"v3_fetcherPersist\":false,\"v3_relativeSplatPath\":false,\"v3_throwAbortReason\":false,\"v3_singleFetch\":false,\"v3_lazyRouteDiscovery\":false,\"unstable_optimizeDates\":false},\"isSpaMode\":true,\"state\":{\"loaderData\":{\"root\":null,\"routes/home/route\":null},\"actionData\":null,\"errors\":null}};</script>",
    "  <script src=/assets/" + manifest + "></script>",
    "  <script type=module src=/assets/" + entry + "></script>",
    "</body>",
    "</html>",
]

os.makedirs("build/client", exist_ok=True)
open("build/client/index.html", "w").write("
".join(lines) + "
")
print("Generated: entry=" + entry + " manifest=" + manifest)
