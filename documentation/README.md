APPLICATION WORKFLOW OVERVIEW
=============================

LOGIN
-----
URL:
- Local:  http://localhost:4200
- Docker: http://localhost:14200

Default Admin Credentials:
- Username: admin
- Password: 123456


PROFILE (USER PREFERENCES)
--------------------------
1. After login, click the user icon in the top-right header to open the Profile page.
2. In Profile:
   - First Name / Last Name: enter values and click Save.
   - New Password: fill only if you want to change it; leave empty to keep the current password.
   - Preferences: very important for the AI feature.
     Example: "I like short business books about leadership and productivity."
3. Click Save.
4. The profile is updated and cached. Preferences are later used by the AI recommendation system.


BOOKS MANAGEMENT
----------------
1. Open Books from the left sidebar (visible only if you have book-related permissions).

2. Search / Filter:
   - Use the search textbox above the table.
   - Filters in real time by: name, title, type, author, description.

3. Add a Book:
   - Click the "+" icon.
   - Fill in: Name, Title, Type, Author, In Stock, optional Description.
   - Optionally upload an image (stored as base64 and used as an icon).
   - Click Save.

4. Edit a Book:
   - Click the pencil icon in the book row.
   - Update fields (Borrowed is not editable).
   - Click Save.

5. Delete a Book:
   - Click the trash icon and confirm.
   - A book cannot be deleted if Borrowed > 0.

6. Color Codes in Book List:
   - Green:  inStock > borrowed (healthy stock).
   - Orange: inStock == borrowed (all copies borrowed).
   - Red:    inStock == 0.


PERMISSIONS, ROLES, AND USERS
----------------------------

PERMISSIONS (READ-ONLY)
- Open Permissions from the sidebar.
- Displays all technical permissions (e.g. add_book, edit_book, checking).
- This page is informational only; no add/edit/delete actions.

ROLES
-----
1. Open Roles to see all roles and their assigned permissions.

2. Add Role:
   - Click "Add Role".
   - Enter a role name (e.g. LIBRARIAN).
   - Select permissions from the multi-select list.
   - Click Save.

3. Edit Role:
   - Click the pencil icon on any role except ADMIN.
   - Update name or permissions and Save.
   - ADMIN is protected and cannot be edited.

4. Delete Role:
   - Click the trash icon and confirm.
   - Be careful when deleting roles that are already assigned to users.

USERS
-----
1. Open Users to see all application users and their roles.

2. Add User:
   - Click "Add User".
   - Fill in: Username, Password, First Name, Last Name, Role, optional Preferences.
   - Click Save.
   - Passwords are encrypted automatically in the database.

3. Edit User:
   - Click the pencil icon (admin user cannot be edited).
   - Update fields as needed.
   - Leave Password empty to keep the current password.
   - Click Save.

4. Delete User:
   - Click the trash icon for non-admin users and confirm.

MENU VISIBILITY VS PERMISSIONS
------------------------------
Sidebar menu items are shown only if the user has at least one related permission:

- Books:   add_book, edit_book, delete_book
- Roles:   add_role, edit_role, delete_role
- Users:   add_user, edit_user, delete_user
- AI:      edit_key
- History: checking

If a role has none of the book permissions, users with that role will not see the Books menu.


HISTORY (CHECK-IN / CHECK-OUT)
------------------------------
1. Open History from the sidebar.
2. The table shows:
   - Action (IN / OUT), date, book title and author,
     borrower first/last name, phone number, and out flag.

3. Filtering:
   - Each column has a filter textbox.
   - Filters work by string matching on action, date, book, author, name, and phone.

4. Check IN (Borrow a Book):
   - Click "Check IN".
   - In the popup:
     - Search Book: filters only books with inStock > 0.
     - Select a book.
     - Enter First Name, Last Name, Phone Number.
   - Click Save:
     - Creates a new history record with action = IN and out = 1.
     - Decreases the book's In Stock count by 1.

5. Check OUT (Return a Book):
   - Only active borrow rows (action = IN and out = 1) show a "Check OUT" button.
   - Click the button and confirm.
   - The system:
     - Creates a new history row with action = OUT.
     - Marks the borrow as completed and updates stock in backend logic.


AI RECOMMENDATIONS
------------------
1. Configure AI Key and Prompt:
   - Open the AI page.
   - The top table shows AI keys.
   - Click the pencil icon to edit:
     - API Key: paste your OpenAI key (e.g. sk-proj-...).
     - Prompt: adjust the base system prompt if needed.
   - Save changes.

2. Ensure Preferences Exist:
   - The current user must have Preferences filled in Profile.
   - If not, the AI feature will display a warning.

3. Use AI:
   - Click "Use AI" on the AI page.
   - Flow:
     - Java backend collects user preferences, all books with inStock > 0,
       and the AI prompt and key into a DTO.
     - Angular sends this DTO to the Python service.
     - Python calls OpenAI (model: gpt-4.1-mini).
     - A ranked list of recommended books is returned.
   - The response appears in a read-only textarea.
   - Errors (missing key, invalid key, network issues) are shown clearly.


SUMMARY
-------
A new admin workflow is:
- Log in with default credentials.
- Update profile and preferences.
- Manage books, roles, and users.
- Track borrowing and returns via History.
- Use AI to recommend books based on user preferences and available stock.
