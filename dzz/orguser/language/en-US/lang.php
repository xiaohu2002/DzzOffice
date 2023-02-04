<?php
$lang = array (
	'appname' => 'Institutional users',
    'explorer_gropuperm'=>array(
        'Collaborative member ',
        'Administrator ',
        'The Founder'
    ),
	'orgname'=>' Organization name',
  'orgname_placeholder'=>' Enter the institution name ',
  'change' => 'change',
  'org_description' => 'introduction',
  'org_description_placeholder'=>' Enter brief description of institutions ',
  'org_space_assign'=>' assign space size ',
  'org_space_assign_tip'=>' maximum available space that can be allocated ',
	'org_space_assign_tips'=>' <li>Unit m, left blank or 0 means no limit, - 1 means no space </Li> <li> limit the amount of space that can be used by the whole organization or department (including all subordinate departments) (the total amount of space used by all departments under the organization cannot exceed this limit) </Li> <li> the space allocated by a department can only be divided from the available space of the superior department; Once allocated, the remaining space of the superior department will be reduced accordingly, regardless of whether the allocated space is actually used up</li>',
	'space_use_department'=>' department space usage ',
  'space_use_org'=>' total organization space usage ',
	'space_use_org_tips'=>'<li>Limit the space available to the entire organization or department (including all subordinate departments). </Li> <li> the space allocated by subordinate departments will be allocated from the available space of superior departments</li>',
	'org_update_success'=>' Update data successfully, will jump for you in 3 seconds ',
  'org_img_uploaded_tip'=>' The image has been uploaded, just check it ',
  'clicktoupload'=>' clicktoupload',
	// admin/orguser/tree.html	  
	'orguser_tree_delete'=>' Are you sure you want to delete this user completely (all of the user’s data and files will be completely deleted)? ',
  'orguser_tree_permission_delete'=>' Delete this user, only remove this user from the department, you may not have permission to operate this user after removal, are you sure you want to remove this user? ',
  'orguser_tree_batch_delete'=>' Organizations or departments do not support batch deletion ',
  'orguser_tree_all_delete'=>' Before deleting a department, you must delete all subordinate departments of this department and delete files in the shared directory. Are you sure you want to delete this department? ',
	// admin/orguser/ajax.php	
	'orguser_ajax_delete'=>' The user in the organization or department cannot be completely deleted, please delete from the organization or department first and try again ',
  'no_parallelism_jurisdiction'=>' no jurisdiction of the corresponding department ',
	// admin/orguser/edituser.php	
	'orguser_edituser_add_user'=>' <div class="well alert danger"> sorry! You do not have permission to add users under this organization or department<Br> <br> you can select the Department with permission on the left, and then try to add </div>',
  'orguser_edituser_add_user1'=>' <div class="well alert danger"> sorry! You do not have administrative rights for this user<Br> <br> you can select the user with permission management on the left side, and then retry adding </div>',
	// admin/orguser/import.php
	'orguser_import_user'=>' No permission, only system administrators can import users ',
  'orguser_import_user_table'=>' Staff information table upload failed, please re-upload ',
  'orguser_import_xls_xlsx'=>' only XLS, XLSX files can be imported ',
  'orguser_import_user_message'=>' Staff information table uploaded successfully, going to import page ',
  'orguser_import_tautology'=>' Failed to upload info table, please try again later ',
  'orguser_import_user_message_table'=>' Please select the Personnel information table',
	// admin/orguser/vidw.php
	'orguser_vidw_delete'=>'<div class="well alert-danger">i’m sorry! You don’t have the administrative authority of this department!<br><br>You can select the Department with permission management on the left</div>',
	// admin/orguser/detail_org.html
	'export_excl'=>' Export all users of this department to an excL file ',
  'detail_org_no_enable'=>' If not enabled, all subordinate departments will not be able to use the shared directory; The shared directory is displayed on the enterprise disk only after this function is enabled. ',
  'detail_org_explorerapp_enable'=>' When enabled, the organization or department directory can be used in applications such as web disk. ',
  'detail_org_enable'=>' The shared directory of this department will be displayed in the enterprise disk organization only after the "detail_org_enable" function is enabled. ',
  'detail_org_creation'=>' When the detail_org_creation shortcut is created, the member desktop will have the shortcut by default. ',
  'group_org_no_enable'=>' After this function is enabled, Resource Manager will display the organization group option. ',
  'group_org_enable'=>' If not enabled, resource Manager will not display the organization group option. ',
	'detail_org_administrator'=>'<strong class="pull-left" style="margin-left:-45px;"> Note: </strong>
  <li>Authority of institution administrator: set administrators of all departments under the institution, manage all personnel in the institution, and manage all shared directories of the institution</li>
  <li>Department Administrator permissions: set administrators of all sub departments under the Department, manage all personnel in the Department, and manage all shared directories of the Department</li>',	
	'Select organization to set organization information'=>' Select organization to set organization information',
  'Select department to set department information'=>' Select department to set department information',
  'Select personnel to set personnel information'=>' Select personnel to set personnel information',
	'Personnel, departments and institutions can directly drag and move to change positions. Move refers to changing the Department to which the person belongs, and Changing the superior organization or department of the department.'=>' People, departments, and organizations can be dragged and moved to change positions. The movement is to change the department of the personnel, and change the superior organization or superior department of the department. ',
  'Hold' => 'Hold',
	'Key to move personnel or departments to copy. It is used to join personnel to multiple departments at the same time.'=>'Key to move people or departments for replication. Add people to multiple departments at the same time.',
	'Key can be used for multiple selections, and release after multiple selections'=>'Key can be multi - selected, multi - selected after release',
	'Key movement is batch movement. Do not loosen'=>' Key to move for batch Loosen. Don’t loosen ',
  'Right click departments,  institutions and personnel to open the right-click menu. There are corresponding more operations in the  Menu.'=>' Right-click the department, organization, or personnel to display the right-click menu. There are more operations in the menu. ',
  'Delete user description'=>' Delete user description',
	'Deleting users from all institutions or departments is only removing users from their own institutions or departments. Users can no longer have all the use rights of their own institutions or departments. It is not deleting users from the system.'=>'If a user is deleted from an organization or department, the user cannot have all the permission to use the organization or department. This does not mean the user is deleted from the system.',
	'When the system administrator deletes the user from the "list of non institutional users", the user will be completely deleted in the system, and all system data and saved files of the user will be deleted. Please use it cautiously by the administrator, and delete it after confirming that the member is to be deleted.'=>'If the system administrator deletes a user from the User List, the user will be completely deleted from the system, and all system data and saved files of the user will be deleted. Use caution before deleting a member.',
	'Key to move to batch copy.'=>' Key to move to batch copy. ',
  'Organization management instructions'=>' Organization Management instructions',
  'inport_guide_download'=>' Download the person information import template ',
  'inport_guide_template'=>' template items will be automatically generated based on the number of user profile items ',
  'inport_guide_user.'=>' Edit the required personnel information table according to the template. ',
  'inport_guide_step'=>' Step 3: Select Excel ',
  'inport_guide_layout'=>' Select the edited staff layout, support. XLS,. XLSX format ',
  'inport_guide_notice'=>' Edit staff information sheet notes ',
	'<li>1. Edit the personnel information to be imported according to the template fields. If there is already a file information table, you only need to change the name of the relevant field in the existing file information table to be consistent with the name provided in the template. As long as the name corresponds, the position of the field does not affect the result</li>
  <li>2. The "user name" field in the template is required, and other fields can be filled in as required</li>
  <li>3. The information in the mailbox and user name fields in the table must be unique and cannot be duplicate. If the mailbox is empty, the system will randomly generate the mailbox address when importing</li>
  <Li class="danger"> 4. Multi level department creation: Method 1: add multiple columns of "subordinate departments" to the table. From left to right, they are level-1 departments, level-2 departments and level-3 departments. The system will create departments, subordinate departments and lower subordinate departments according to the principle from left to right. Method 2: use a single column in the table, and the superior and subordinate departments use "/" to divide (for example, primary school / grade 1 / class 1)</li>
  <li>5. Importing users can only import by organization. Multiple organizations need to be imported in batches</li>
  <li>6. The "login password" field in the table can be blank, and administrators can set unified passwords for users in batches when importing. The user can modify the unified password after logging in</li>
  <li>7. There are two import methods in the import interface: incremental and overwrite. Incremental method: when encountering the same user, only the missing field information of the user will be added, and the original information will not change. (for example, there is a user a in the system with a password of 123. In the batch import table, there is also a user a, whose unified password is set to ABC when importing. After importing, the passwords of other users are all ABC, and the original user a still keeps his original password, 123.) Overwrite import: completely replace the original user information in the system with the information in the table</li>
  <li>8. If there are many people to import, it is recommended to make a test table for a small number of people first, and then import all users in an incremental way after the test is correct</li>'=>'<li>1. Edit the personnel information to be imported according to the template fields. If there is already a file information table, you only need to change the name of the relevant field in the existing file information table to be consistent with the name provided in the template. As long as the name corresponds, the position of the field does not affect the result</li>
  <li>2. The "user name" field in the template is required, and other fields can be filled in as required</li>
  <li>3. The information in the mailbox and user name fields in the table must be unique and cannot be duplicate. If the mailbox is empty, the system will randomly generate the mailbox address when importing</li>
  <Li class="danger"> 4. Multi level department creation: Method 1: add multiple columns of "subordinate departments" to the table. From left to right, they are level-1 departments, level-2 departments and level-3 departments. The system will create departments, subordinate departments and lower subordinate departments according to the principle from left to right. Method 2: use a single column in the table, and the superior and subordinate departments use "/" to divide (for example, primary school / grade 1 / class 1)</li>
  <li>5. Importing users can only import by organization. Multiple organizations need to be imported in batches</li>
  <li>6. The "login password" field in the table can be blank, and administrators can set unified passwords for users in batches when importing. The user can modify the unified password after logging in</li>
  <li>7. There are two import methods in the import interface: incremental and overwrite. Incremental method: when encountering the same user, only the missing field information of the user will be added, and the original information will not change. (for example, there is a user a in the system with a password of 123. In the batch import table, there is also a user a, whose unified password is set to ABC when importing. After importing, the passwords of other users are all ABC, and the original user a still keeps his original password, 123.) Overwrite import: completely replace the original user information in the system with the information in the table</li>
  <li>8. If there are many people to import, it is recommended to make a test table for a small number of people first, and then import all users in an incremental way after the test is correct</li>',		
	'import_list_organization'=>' select the organization to import. If no organization is imported, a new organization and department will be generated according to the Department in the user information table. If no organization is imported, it will be directly imported to "personnel without organization ',
  'import_list_password'=>' default user password. When the login password item is not set, the password set here will be used as the password of the newly imported user ',
  'import_list_coverage'=>' incremental import method: the newly imported user information is intelligently added to the original user information; Overwrite import: the newly imported information overwrites the information of the original user. It is recommended to use the incremental method. ',
	'import_list_text'=>'<li>User name and mailbox items are required</li>
  <li>Click the content of the import item below to edit it temporarily. When editing a department, please note that each line of the Department is a parent-child relationship, and the previous line is the parent department of the next line</li>
  <li>Items that do not need to be imported can be deleted by clicking "X" on the right</li>
  <li>Click the import button to import the current project. Click the import all button to import all items in sequence. You can click stop again in the middle</li>',
	// admin/member/adduser.html
	'adduser_login_email_text'=>' This parameter is mandatory. It can be used for system login. When employees pay attention to the enterprise ID, the enterprise ID will be matched according to the email address. ',
  'adduser_compellation_text'=>' Required, displayed in system, easy to identify ',
  'adduser_phone_number_text'=>' Set this parameter to the mobile phone number bound to wechat. When an employee pays attention to the enterprise number, it will be matched according to the mobile phone bound to wechat. ',
  'adduser_weixin_text'=>' indicates the employee’s wechat ID. When an employee follows the enterprise ID, it will match according to the employee’s wechat ID. ',
  'adduser_exceptional_space_text'=>' Unit M, additional user storage space (total user space=default space + extra space) ',
  'adduser_disable_user_text'=>' After the user is disabled, the user cannot log in to the system. Perform this operation with caution ',
  'adduser_usergroup_text'=>' After you set the user as the system administrator, this user will have the system management rights. Please be cautious! ',
	// admin/member/edituser.html
	'edituser_login_email_text'=>' This parameter is optional and can be used for system login. When employees pay attention to the enterprise number, it will be matched according to the employee’s email address. ',
  'edituser_weixin_text'=>' Select, employee’s wechat ID. When employees follow enterprise ID, it will be matched according to the employee’s wechat ID. If you have paid attention to it, this item cannot be modified. ',
	'supervisor_position'=>' supervisor position',
  'send_password_user_mailbox'=>' Send password to mailbox',
  'login_email_required'=>' Required for login ',
  'name_will'=>' username required ',
  'none_write_login_password'=>' No login password yet ',
  'none_write_affirm_password'=>' affirm_password has not been filled in ',
	'phone_number'=>' mobile phone number',
  'phone_number_illegal'=>' mobile phone number is illegal',
  'weixin_phone_number'=>' wechat bound mobile phone number',
  'weixin_illegal'=>' wechat illegal',
  'user_weixin'=>' employee weixin',
  'weixin_exist'=>' wechat already exists ',
  'random_password'=>' Generate random password',
  'exceptional_space'=>' extra space',
  'disable_user'=>' Disable this user',
  'block_up' => 'stop',
  'set_system_administrator'=>' Set as system administrator',
  'add_a_item'=>' add an item',
	'add_user'=>' Add user',
  'add_user_success'=>' User added successfully ',
  'edit_user_success'=>' Modify user information successfully ',
	'export_user'=>' Export user',
  'shared_directory_set'=>' shared directory setting ',
  'group_on_set'=>' Group function Settings ',
  'shared_directory_desktop_shortcut'=>' Shared directory desktop shortcut',
  'position_management'=>' position management',
  'add_position'=>' Add position',
  'position_name'=>' position name',
	'organization_department'=>' Organization Department',
	'share_enable_successful'=>' The shared directory is enabled successfully! ',
  'share_close_successful'=>' The shared directory is closed successfully! ',
  'group_on_successful'=>' The group function has been enabled successfully! ',
  'group_close_successful'=>' The group function is disabled successfully! ',
	'login_username_placeholder'=>' Login username ',
  'login_username_text'=>' required, available for system login ',
  'required_used_login_system'=>' required, available for system login ',
	'space_not_change_password'=>' Leave blank, do not change password',
	'export_range_user'=>' Select the export range, all users in this range will export ',
  'export_data'=>' Export data item ',
	'import_nbsp'=>'The import',
	'creation_agency'=>' New agency',
  'creation_bottom_section'=>' Create the bottom_section',
  'creation_equally_section'=>' New sibling department ',
  'please_select_same_type_node'=>' Please select a node of the same type ',
  'please_select_same_section_node'=>' Please select a node in the same department ',
  'add_administrator_unsuccess'=>' Failed to add administrator ',
  'no_open_Shared_directory'=>' cannot be set because the shared directory is not enabled ',
  'please_select_range_export'=>' Please select the export scope ',
  'please_select_project_export'=>' Please select export project ',
  'user_information_table'=>' Person information table',
  'bulk_import_user_template'=>' Import user templates in batches ',
  'name_email_empty'=>' Username and mailbox cannot be empty',
  'lack_required_fields_name'=>' lacks the required field "user name"',
  'lack_required_fields_name_email'=>'The required field user name or mailbox is missing',
	'bulking' => 'delta',
  'coverage' => 'cover',
);
?>