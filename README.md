# Rsbuild project

## Setup

Install the dependencies:

```bash
npm install
```

## Get started

Start the dev server:

```bash
npm dev
```

Build the app for production:

```bash
npm build
```

Preview the production build locally:

```bash
npm preview
```

## Steps to use application
Some general notes:
```
Due to how the data is managed in the application, if you refresh the page
the application will generally revert back to its original state. Keep this in mind during testing.
For the purposes of testing this application, we will assume that when opening the app you have signed in with an email and password.
For your testing, your initial user account is named as "Olivia." A different user, "JohnTheVet" is also utilized in some places.
```

### Profile Page:
First we'll start with basic profile details
```
first, click on the profile icon on the footer to enter the profile page and view the existing profile
then, use the gear icon in the top right corner to enter your profile settings
here, you can start with changing the username. Enter OliviaLikesPets for example, or Olivia123
then, you can select a location, go ahead and pick British Columbia, though any would work
you don't need to enter a date of birth, but you can if you'd like. 
then, change the About Me to "Hello! I am a pet enthusiast and this is my profile!"
Finally, select the camera icon in the top left and upload a profile picture, any you'd like. Then save your changes. 
```

Now we'll move on to other profile settings. 
```
For privacy settings, you can set them however you'd like. Later in the demo, you'll have a chance to see
a profile that has its "Who Can Message Me" set to friends only, to get an example of how that is handled. 
In notifications, you can keep the values on default.
Since there won't be other users making posts or sales being added while you are testing the app for example, there won't really be new notifications for you to get. 
You will get a chance to see what notifications you would have received.
```
Now for the pet profile!
```
Next, we'll make a pet profile. First, enter a pet name. "Scratch" for example.
If you'd like now, perhaps you "accidentally" click on the return to profile button. See what comes up!
Then, you can skip the extra treat day and select a profile picture for your pet using the camera icon. 
Add an About Me for the pet as well, something like "Scratch is a fun dog who loves to play fetch!"
Then save your changes, and return to your profile. 
```

You can now see your updated profile! Now we'll move on to other sections of the app. 
### Home Page:
```
info here
```
### Events Page:
```
info here
```
### Group Page:
---

#### 1. Browsing, searching, and filtering groups
1. Tap the **Groups** icon in the footer to open the **Browse Groups** page.  
2. In the search bar at the top, type **Dog** and press Enter – only dog‑related groups should appear.  
3. Clear the search text to reset the list.  
4. Expand the **Filters ▾** panel:  
    Use the **Animal Type** dropdown and pick **Dog** – groups whose animal type Dog should disappear.  
    Switch **Group Type** between **Public** and **Invite Only** to see the list update.  
    Choose a **Location** such as **Calgary, AB** to narrow results geographically.  
5. Click the **✕** beside **Filters** to clear all filters and restore the full list.  
6. Press **Join** on any public group (e.g., **New Dog Owners**).  
    The button text changes to **Cancel Request** (or **Leave Group** if auto‑approved).  
    Press it again to verify you can withdraw the request.

---

#### 2. Creating a new group
1. From **Browse Groups**, hit the **＋ New Group** button in the top‑right corner.  
2. Fill in the form:  
    **Title:** “Calgary Cat Lovers”  
    **Description:** “A friendly place to swap cat care tips.”  
    **Location:** “Calgary, AB”  
    **Animal Type:** select **Cat**  
    **Group Image:** upload any square image of a cat  
    **Joining Policy:** leave as **Public** (or switch to **Invite Only** to test that flow)  
3. Press **Save** – you should be redirected back to **Browse Groups** and see the new group listed.  
4. Tap on the group you just created; because you are the creator, membership is instant and the button should now read **Joined**.

---

#### 3. Interacting inside a group
1. Click the group card to enter the **Group Detail** page.  
2. Verify the header shows the group image, name, location, member count, and the buttons **Create Post** & **Leave Group**.  
3. **Viewing members:**  
    Click the member‑count link (e.g., “46 members”).  
    A popup/modal should list all current members; close it with the **Close** button.  
4. **Creating a post:**  
    Hit **Create Post**.  
    In the dialog, type “Does anyone have tips for crate training?” and press **Post**.  
    Confirm it appears at the top of the feed with your username.  
5. **Leaving the group:**  
    Press **Leave Group**.
    You would be prompted if you are sure you want to leave the group? Tap yes to agree or cancel.
    You should be returned to **Browse Groups** and the button on that card reverts to **Join**.
6. **Deleting a group**
    Press **Delete Group**,
    You would be asked to confirm if you want to delete the group or not.
    Tap Yes, Delete or Cancel.

---

### Shop Page:
```
info here
```