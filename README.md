# CSV Import+Export
CSV Import+Export is an Excel add-in which adds the ability to import and export CSV files.

<div align="center">
    <img src="https://raw.githubusercontent.com/Emurasoft/excel-csv-import/master/screenshots/0.png?raw=true"  alt="Import CSV taskpane in Excel" width="500px" />
    <br><br>
    <img src="https://raw.githubusercontent.com/Emurasoft/excel-csv-import/master/screenshots/1.png?raw=true"  alt="Export CSV taskpane in Excel" width="500px" />
</div>

# Dev build

1. Open a blank worksheet on Excel Online.  Go to Insert | Office Add-ins. On the top right hand corner under Manage My Add-ins, click Upload my Add-In. Upload `manifests/dev.manifest.xml`.

2. Run Webpack.

```none
npm i
npm run devServer
```

3. Go to `https://localhost:3000/` and accept the self-signed certificate.