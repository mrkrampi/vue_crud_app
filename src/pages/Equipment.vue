<template>
    <div>
        <equipment-table></equipment-table>
        <equipment-dialog></equipment-dialog>
        <snackbar></snackbar>
    </div>
</template>

<script>
    import EquipmentTable from "@/components/equipment/EquipmentTable";
    import EquipmentDialog from "@/components/equipment/EquipmentDialog";
    import Snackbar from "@/components/others/Snackbar";

    export default {
        name: "Equipment",
        components: {Snackbar, EquipmentDialog, EquipmentTable}
    }
</script>