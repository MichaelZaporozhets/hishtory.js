Hishtory.js
===============
HTML5 pushState without the tears.

--------


**Why?**

HTLM5 pushState with a fallback is probably one of the most annoying things to implement the way that you want to, ever.

This is the part where you say, 'But Michael, history.js already makes this easy...'. History.js is amazing, but getting from zero to hero is actually a bit of a pain.

Simply put, it does way too much for something that you shouldn't even notice.

**Simpler-history does what?**

Does the same basic crap everyone uses history.js for, in 97% less code, kilobytes and effort.

Boo-ya!

**How do I make it go go go?**

Add something like this to your head.

    <script src="path/to/simpler-history.0.2.min.js"></script>


And then start it up like this:

    var openPage = function(page) {
      console.log('opened page: '+page);
      return false;
    };

    // You've gotta define where the page root is 
    otherwise everything will break..
    SH.info.root = 'simpler-history/';
    
    // 'openPage' is the function you want to use to 
    respond to page changes and the seconds argument is options
    SH.init(openPage,{forceFallback:true}});

**Options**

So far there's only really one.

'forceFallback' lets you force falling back to hashbangs if you don't have any backend to support yo-self.

**Opening pages**

Simpler-history routes to pushState via hashBangs anyway; so if you open a page with the hashbang you want to get to.... You're there! ( naturally )


**Examples**

Opening a page with a hashBang href attribute works. ( naturally )

    <a href="#!/home">Back home?</a>


But ofcourse sometimes things get a little bit more sticky and you might want to do it manually!

Yes, you can do that too.

    SH.open('home')
