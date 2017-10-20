/// <reference path="../typings/xrm/xrm.d.ts"/>
class CommonMethods {
    static doUserHasRole(inputRole: string, buID: string): boolean {

        let userCurrentRoles: string[] = Xrm.Page.context.getUserRoles();

        inputRole = inputRole != "" ? inputRole.replace(/&/g, '%26') : "";

        let role: any = Service.RetrieveMultiple("roles",
            "_businessunitid_value,name,roleid",
            "name eq '" + inputRole + "' and  _businessunitid_value eq " + buID);

        let inputRoleId: string = role != undefined && role.length > 0 ? role[0].roleid : "";
        let flag: number = 0;

        userCurrentRoles.forEach(element => {
            if (element == inputRoleId)
                flag++;
        });
        if (flag == 0)
            return false;
        else
            return true;
    }
}