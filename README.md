# CSV Import+Export
CSV Import+Export is an Excel add-in which adds the ability to import and export CSV files.

<div align="center">
    <img src="https://raw.githubusercontent.com/Emurasoft/excel-csv-import/master/screenshots/0.png?raw=true"  alt="Import CSV taskpane in Excel" width="500px" />
    <br><br>
    <img src="https://raw.githubusercontent.com/Emurasoft/excel-csv-import/master/screenshots/1.png?raw=true"  alt="Export CSV taskpane in Excel" width="500px" />
</div>

# Dev build

1. Open a blank worksheet on Excel Online.  Go to Insert | Office Add-ins. On the top right hand corner under Manage My Add-ins, click Upload my Add-In. Upload `manifests/dev.manifest.xml`.

2. Run the following commands to start webpack-dev-server.

```none
npm i
npm run devServer
```

3. Go back to Excel and open CSV Import+Export.

- Having both the published version and your dev version of CSV Import+Export installed can get confusing. I recommend removing the published version so you know which one you are working on.

- [Microsoft's detailed sideloading tutorials](https://docs.microsoft.com/en-us/office/dev/add-ins/testing/test-debug-office-add-ins)
