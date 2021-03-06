/*
 * Copyright (c) 2015 Adobe Systems Incorporated. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, brackets, $ */

define(function (require, exports, module) {
    "use strict";
    
    var ExtensionManager = brackets.getModule("extensibility/ExtensionManager"),
        _                = brackets.getModule("thirdparty/lodash");
   

    /**
     * @private
     * Check for the extensions whether it is user installed and present in the registry.
     * @param {Object} extensions synchronized with registry object
     * return {Array} userInstalledExtensions
    */
    function getUserExtensionsPresentInRegistry(extensions) {
        var userInstalledExtensions = [];
        _.forEach(extensions, function (extension, extensionId) {
            if (extension && extension.installInfo && extension.installInfo.locationType === "user" && extension.registryInfo) {
                userInstalledExtensions.push({"name" : extensionId, "version" : extension.installInfo.metadata.version});
            }
        });
        
        return userInstalledExtensions;
    }
    /**
     * Utility function to get the user installed extension which are present in the registry
     */
    function getUserInstalledExtensions() {
        var result = new $.Deferred();

        if (!ExtensionManager.isRegistryObjectUpdated) {
            ExtensionManager.downloadRegistry().done(function () {
                result.resolve(getUserExtensionsPresentInRegistry(ExtensionManager.extensions));
            })
                .fail(function () {
                    result.resolve([]);
                });
        } else {
            result.resolve(getUserExtensionsPresentInRegistry(ExtensionManager.extensions));
        }
        
        return result.promise();
    }
    
    exports.getUserInstalledExtensions   = getUserInstalledExtensions;
});