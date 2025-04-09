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
The Home Page is available upon first opening the application, or by clicking the Home button.
The Home Page is made of a few key elements: the Notification Center (denoted with the Bell icon), the Search, the New Post button, and the Feed.
Using the Feed:
```
The Feed displays all available posts. We have pre-loaded some posts to display various features of our posting system that can be viewed. To 
```
```
 
```
### Events Page:
```
Click on the calendar icon in the footer to access the Events page.
By default you'll see a monthly calendar view with all events displayed (events you've joined, searchable events, and events you are hosting).

To change views:
- Click "Day" to see events for a single day
- Click "Week" for a weekly overview
- Click "Month" to return to the monthly view
Use the arrows in the top left to navigate between time periods.

Events you are hosting or have joined appear slightly faded.
```
To join an event:
```
1. Click on any non-grayed out event in the calendar (grayed events are ones you're already hosting / joined).
2. A popup will ask "Would you like to join [Event Name]?"
3. Click "Confirm" to join or "Cancel" to decline.
```
Search for a specific event:
```
1. Type in the search bar (e.g., "adoption" or "training")
2. The calendar will filter to show matching events
3. Matching events will appear in the "Search Results" section below
4. Click "Join" on any search result to participate

You may use the filter to the right of the search bar to narrow down results even further.
```
Managing your events:
```
In the "Events I'm Hosting" section:
- Click "Edit" to modify event details (date, description, etc.)
- Click "Delete" to remove an event
(For recurring events, deleting will remove all occurrences)

In the "My Upcoming Events" section:
- Click "Leave" to withdraw from an event you've joined
```
Creating new events:
```
To host a new event:
1. Click the "+ New Event" button in the top right
2. Fill in the event details:
   - Title (e.g., "Dog Training Workshop")
   - Description (e.g., "Basic obedience training for puppies")
   - Date and time using the date picker
   - Location (e.g., "Central Park Dog Area")
   - Event type from the dropdown (e.g., "Training")
3. For recurring events:
   - Toggle "Recurring Event" ON
   - Select frequency: Weekly, Biweekly, or Monthly
   - Set an end date (optional)
4. Click "Create Event"
Your new event will appear in both the calendar and "Events I'm Hosting" section.
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

Let’s start with exploring the Shop page
```
First, click on the shop icon in the bottom navigation bar to enter the shop page
You'll see a catalog of pet-related products ready to browse
At the top, try typing something into the search bar — like "toy" or "dog"
Then, try using the filter icon to narrow by category or price — pick any that interest you
You can use any combinations of a search query and a filter
When any filter is applied, click the gray filter button to clear the filters
```

Now we’ll add items to your cart
```
Scroll through the catalog and pick an item you like, then click the "Add to Cart" button
You’ll notice the button updates to show how many of that item are in your cart
Feel free to click it again to add more of the same item
Repeat for a couple different products to fill your cart
```

Let’s go check your cart
```
Tap the cart icon in the top right to open your cart
You’ll see all the items you’ve added, with a subtotal at the bottom
Try increasing an item’s quantity using the plus (+) icon
Then decrease it with the minus (-) icon, or remove it completely using the trash icon
```

Now we’ll walk through checkout
```
Click the checkout button at the bottom of the cart page
You’ll be taken straight to a success screen that confirms your order
No payment info is needed
You can’t view past purchases yet, but you’ll see your order went through!
```