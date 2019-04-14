<template>
    <div>
        <enterprise-table></enterprise-table>
        <enterprise-dialog></enterprise-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import EnterpriseTable from "@/components/enterprise/EnterpriseTable";
    import EnterpriseDialog from "@/components/enterprise/EnterpriseDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Enterprise",
        components: {Snackbar, EnterpriseDialog, EnterpriseTable}
    }
</script>