# Apogee

You've built this fantastic API-driven application, hooked it into a fantastic [Angular](http://angularjs.org) front-end, and you're finally ready to rock. Not so fast.

What if you want to slowly roll out new features, or change the content that's delivered at different endpoints? Never fear: building a versioned API on top of Express is easy with Apogee.

Apogee was developed by humans at [Original Machine](http://originalmachine.com), for their social jukebox/music licensing app, [Mixdown](http://mixdown.co), so you know it's stable &mdash; because we tossed it into production almost immediately!

## Installation

```
npm install apogee
```

## Usage

```javascript
var apogee = require('apogee')
,   app    = require('express')();

apogee.configure({ default: '1', header: 'X-API-Version' });

app.route('/')
  .all(apogee.limit('2'))
  .get(function (req, res) {
     res.send('Hello from Version 2');  
  });

app.route('/')
  .all(apogee.limit('1'))
  .get(function (req, res) {
     res.send('Hello from Version 1');  
  });
```

Now, you can easily send the ```X-API-Version``` header, and switch between versions of your API. It's quick and painless.

## Contributing

1. Fork the repository, and do all of your work in a feature branch.

2. Don't change the API without notifying me. Breaking changes are totally fine, but we should establish a sane upgrade path first.

3. Document and test your changes.

4. Send that pull request!

## License

Copyright (C) Original Machine LLC.
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
