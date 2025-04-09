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
### Groups Page:
```
info here
```
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

Now we’ll add items to your cart**
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