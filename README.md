# CSV Import+Export
CSV Import+Export is an Excel add-in which adds the ability to import and export CSV files.

<div align="center">
    <img src="https://raw.githubusercontent.com/Emurasoft/excel-csv-import/master/screenshots/0.png?raw=true"  alt="Import CSV taskpane in Excel" width="500px" />
    <br><br>
    <img src="https://raw.githubusercontent.com/Emurasoft/excel-csv-import/master/screenshots/1.png?raw=true"  alt="Export CSV taskpane in Excel" width="500px" />
</div>

# Dev build

1. Open a blank worksheet on Excel Online.  Go to Insert | Office Add-ins. On the top right hand corner under Manage My Add-ins, click Upload my Add-In. Upload `manifests/dev.manifest.xml`.
  - Sideloading works on the desktop version of Excel as well, but Excel Online allows you to open the dev console.

2. Run Webpack.

```none
npm i
npm run devServer
```

3. Go to `https://localhost:3000/` and accept the self-signed certificate if the untrusted certificate warning appears.

4. Go back to Excel and open the add-in.
  - Having both the published version and your dev version of CSV Import+Export installed can get confusing. I recommend uninstalling the published version so you know which one you are working on.

- [Microsoft's detailed sideloading tutorial](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing)